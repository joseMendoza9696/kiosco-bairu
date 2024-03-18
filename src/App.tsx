import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Login from './pages/Login';

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [theme, setTheme] = useState<string>('light');

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('user');
  };

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
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
