import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { PROFILE_QUERY } from '../api/graphql/query';
import { Footer } from './Footer';
import { Icon } from '@iconify/react';

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
    <div className="container mx-auto mt-8 p-4">
      <div className="flex justify-center items-center">
        <img
          src={profileData?.contextStyle.logo}
          alt="logo"
          className="rounded-lg h-80 w-80 mr-4"
        />
      </div>
      <div>
        <h1 className="text-5xl font-bold text-dark text-center">
          ORDENA AQUÍ
        </h1>
      </div>
      <div className="flex justify-center mt-8">
        <button className="mx-4 px-4 py-2 btn btn-outline btn-secondary">
          <a href="/menu">
            <Icon icon="zondicons:location-food" />
            Comer aquí
          </a>
        </button>
        <button className="mx-4 px-4 py-2 btn btn-outline btn-secondary">
          <Icon icon="fa6-solid:basket-shopping" />
          Para llevar
        </button>
      </div>
      <Footer />
    </div>
  );
};
