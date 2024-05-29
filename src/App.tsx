import { Routes, Route } from 'react-router';
import { BienvenidaPage } from './pages/Bienvenida';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Login from './pages/Login';
import { Menu } from '../src/components/Menu/index.tsx';
import { Checkout } from './pages/Checkout.tsx';
import { Pago } from '../src/components/Pago/index.tsx';
import { Agradecimiento } from './pages/Agradecimiento.tsx';
import { PagoConfirmado } from './pages/PagoConfirmado.tsx';
import { useLazyQuery } from '@apollo/client';
import { PROFILE_QUERY } from './api/graphql/query.ts';

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'dark';
  });

  const [, setProfileData] = useState<{
    contextStyle: { logo: string };
  } | null>(null);

  const [getPerfil] = useLazyQuery(PROFILE_QUERY, {
    onCompleted: (data) => {
      const perfil = data.KIOSCO_getPerfilActivo;
      setProfileData(perfil);
      localStorage.setItem('Perfil', JSON.stringify(perfil));
      if (perfil.contextStyle && perfil.contextStyle.estilo) {
        setTheme(perfil.contextStyle.estilo);
        localStorage.setItem('theme', perfil.contextStyle.estilo);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const storedPerfil = localStorage.getItem('Perfil');
    if (storedPerfil) {
      const perfil = JSON.parse(storedPerfil);
      setProfileData(perfil);
      if (perfil.contextStyle && perfil.contextStyle.estilo) {
        setTheme(perfil.contextStyle.estilo);
      }
    } else {
      getPerfil();
    }
  }, [getPerfil]);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        setTheme(event.newValue || 'light');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      {!token && <Login setToken={setToken} />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={token}>
              <BienvenidaPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute user={setToken}>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={setToken}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute user={setToken}>
              <Pago />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agradecimiento"
          element={
            <ProtectedRoute user={setToken}>
              <Agradecimiento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagoConfirmado"
          element={
            <ProtectedRoute user={setToken}>
              <PagoConfirmado />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
