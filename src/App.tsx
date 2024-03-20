import { Routes, Route } from 'react-router';
import { Bienvenida } from './pages/Bienvenida';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Login from './pages/Login';
import { Menu } from './pages/Menu';

function App() {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('user');
  };

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
      {token ? (
        <button onClick={handleLogout} className="btn btn-error">
          logout
        </button>
      ) : (
        <Login setToken={setToken} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={token}>
              <Bienvenida />
            </ProtectedRoute>
          }
        />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}

export default App;
