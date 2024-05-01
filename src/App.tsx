import { Routes, Route } from 'react-router';
import { BienvenidaPage } from './pages/Bienvenida';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Login from './pages/Login';
import { Menu } from '../src/components/Menu/index.tsx';
import { Checkout } from './pages/Checkout.tsx';

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  // guardar tj

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
      </Routes>
    </>
  );
}

export default App;
