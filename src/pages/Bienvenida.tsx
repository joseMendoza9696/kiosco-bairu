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
      <div className="flex justify-center items-center pb-40 pt-10">
        <img
          src={profileData?.contextStyle.logo}
          alt="logo"
          className="rounded-full h-40 w-40 mr-4"
        />
      </div>
      <div>
        <h1 className=" text-4xl lg:text-9xl font-bold text-dark text-center ">
          LA VIDA ES MÁS FÁCIL PIDIENDO ASÍ
          <span className="p-10">
            <Icon
              icon="mdi:arrow-down-bold"
              style={{
                height: '190px',
                width: ' 190px',
                margin: '10 auto',
              }}
            />
          </span>
        </h1>
      </div>
      <div className="flex justify-center mt-8 space-x-20 ">
        <button className="mx-4 px-6 py-3 btn btn-primary btn-secondary text-2xl w-72 h-72 flex flex-col items-center justify-center rounded-3xl">
          <a href="/menu">
            <div className="flex flex-col items-center">
              <Icon icon="zondicons:location-food" className="text-8xl mb-6" />
              <span className="text-3xl">Comer aquí</span>
            </div>
          </a>
        </button>
        <button className="mx-4 px-6 py-3 btn btn-primary btn-secondary text-2xl w-72 h-72 flex flex-col items-center justify-center rounded-3xl">
          <a href="/para-llevar">
            <div className="flex flex-col items-center">
              <Icon
                icon="fa6-solid:basket-shopping"
                className="text-8xl mb-6"
              />
              <span className="text-3xl">Para llevar</span>
            </div>
          </a>
        </button>
      </div>

      <Footer />
    </div>
  );
};
