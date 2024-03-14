import { Routes, Route } from 'react-router';
import { Home } from './components/Home';
import { useState } from 'react';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

interface KioscoLoginData {
  KIOSCO_login: {
    id: number;
    negocio: string;
    tipoNegocio: string;
    token: string;
  };
}

interface KioscoLoginVariables {
  login: {
    licenciaId: string;
  };
}

const LOGIN_MUTATION = gql`
  mutation KIOSCO_login($login: KioscoLogin!) {
    KIOSCO_login(login: $login) {
      id
      negocio
      tipoNegocio
      token
    }
  }
`;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [licenseId, setLicenseId] = useState('');

  const [loginMutation] = useMutation<KioscoLoginData, KioscoLoginVariables>(
    LOGIN_MUTATION,
  );

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: {
          login: {
            licenciaId: licenseId,
          },
        },
      });

      if (data && data.KIOSCO_login && data.KIOSCO_login.token) {
        setToken(data.KIOSCO_login.token);
        localStorage.setItem('token', data.KIOSCO_login.token);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('user');
  };

  return (
    <>
      {token ? (
        <button onClick={handleLogout} className="btn btn-error">
          logout
        </button>
      ) : (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 ">
          <div className='className="mb-8 text-center'>
            <h1 className="my-3 text-4xl font-bold">Login</h1>
          </div>
          <div className='div className="space-y-4">'>
            <input
              type="text"
              placeholder="licencia"
              value={licenseId}
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setLicenseId(e.target.value)}
            />
          </div>
          <br />
          <button onClick={handleLogin} className="btn btn-success">
            login
          </button>
        </div>
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
