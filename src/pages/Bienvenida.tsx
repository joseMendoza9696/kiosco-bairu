import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { PROFILE_QUERY } from '../api/graphql/query';

export const Bienvenida = () => {
  const [profileData, setProfileData] = useState<{
    contextStyle: { logo: string };
  } | null>(null);

  const { loading, error, data } = useQuery(PROFILE_QUERY);

  useEffect(() => {
    if (data && data.KIOSCO_getPerfilActivo) {
      setProfileData(data.KIOSCO_getPerfilActivo);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <img
        src={profileData?.contextStyle.logo}
        alt="logo"
        className="rounded-full"
      />{' '}
      <p className="text-dark  ">ORDENA AQUI </p>
      {loading && <p>Loading...</p>}
      {profileData && <h1>Bienvenvida </h1>}
      <button>COMER AQUI</button>
      <button>Para llevar</button>
      <p>Powered by Bairü</p>
    </div>
  );
};
