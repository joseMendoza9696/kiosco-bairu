import { useEffect, useState } from 'react';
import { PROFILE_QUERY } from '../api/graphql/query';
import { useLazyQuery } from '@apollo/client';

export const Agradecimiento = () => {
  const [perfildata, setPerfilData] = useState<{
    contextStyle: { logo: string };
  } | null>(null);

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
  }, [getPerfil]);
  return (
    <>
      <div className="bg-primary flex flex-col items-center justify-around w-full h-[1919px]">
        <div>
          <img
            src={perfildata?.contextStyle.logo}
            alt="logo"
            className="rounded-full h-[192px] w-[207px] mr-4"
          />
        </div>
        <div className="flex items-center justify-between flex-col h-[800px]">
          <div>
            <p className=" lg:text-[100px] font-bold text-dark text-center dark:text-white">
              ¡GRACIAS POR TU COMPRA!
            </p>
          </div>
          <div className="btn btn-white w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center  ">
            <p className="text-3xl">Tu pedido es el</p>
            <span className="text-6xl font-bold ">#12</span>
          </div>
        </div>
        <div className="dark:text-white text-[30px]">POWERED BY BAIRU.IO</div>
      </div>
    </>
  );
};
