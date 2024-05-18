import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../api/graphql/mutations';

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [licenseId, setLicenseId] = useState('');
  const [loginMutation] = useMutation(LOGIN_MUTATION);

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

  return (
    <div className="bg-primary w-screen h-screen flex flex-col  p-6  ">
      <div className="pt-[200px] text-center ">
        <h1 className="my-3 text-[50px] font-bold dark:text-white">BAIRÜ.IO</h1>
      </div>
      <div className="mx-[100px]">
        <input
          type="text"
          placeholder="licencia del Kiosco "
          value={licenseId}
          className="w-full px-3 py-2 border rounded-md"
          onChange={(e) => setLicenseId(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleLogin} className="btn btn-secondary mx-[200px]">
        login
      </button>
    </div>
  );
};

export default Login;
// 66211e4c08313def71a37cf7
