import { useEffect, useState } from 'react';
import { PROFILE_QUERY } from '../api/graphql/query';
import { useLazyQuery } from '@apollo/client';

export const Agradecimiento = () => {
  const [perfildata, setPerfilData] = useState<{
    contextStyle: { logo: string };
  } | null>(null);

  const [comandaId, setComandaId] = useState<string | null>(null);

  const [getPerfil] = useLazyQuery(PROFILE_QUERY, {
    onCompleted: (data) => {
      setPerfilData(data.KIOSCO_getPerfilActivo);
      localStorage.setItem(
        'Perfil',
        JSON.stringify(data.KIOSCO_getPerfilActivo),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    getPerfil().then();
    const params = new URLSearchParams(window.location.search);
    setComandaId(params.get('comandaId'));
  }, [getPerfil]);

  return (
    <div className="bg-primary flex flex-col items-center justify-around w-full h-screen">
      <div className="md:h-[15%] lg:h-[15%]">
        <img
          src={perfildata?.contextStyle.logo}
          alt="logo"
          className="rounded-full w-max h-full"
        />
      </div>
      <p className="dark:text-white font-bold text-center md:text-6xl lg:text-8xl">
        ¡GRACIAS POR TU COMPRA!
      </p>
      <div className="btn btn-white box-content h-max flex flex-col rounded-3xl md:py-[5em] md:px-[1em] lg:py-[8em] lg:px-[2em]">
        <p className="md:text-4xl lg:text-5xl">Tu pedido es el</p>
        <span className="md:text-6xl lg:text-7xl font-bold ">#{comandaId}</span>
      </div>
      <div className="dark:text-white md:text-4xl">POWERED BY BAIRU.IO</div>
    </div>
  );
};
