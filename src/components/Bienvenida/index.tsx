import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GET_INFO_KIOSCO,
  GET_MENU,
  PROFILE_QUERY,
} from '../../api/graphql/query';
// REDUX
import { useDispatch } from 'react-redux';
import { guardarMenu } from '../../redux/actions/menu.action.ts';
// import { RootState } from '../../redux/store.ts';
import { actualizarTipoEntrega } from '../../redux/actions/nuevaOrden.action.ts';
import { Link } from 'react-router-dom';

export const Bienvenida = () => {
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState<{
    contextStyle: { logo: string };
    screens: {
      factura: boolean;
      llevar: boolean;
      aqui: boolean;
      telefono: boolean;
      nombre: boolean;
    };
    banner: string;
  } | null>(null);

  const [getPerfil] = useLazyQuery(PROFILE_QUERY, {
    onCompleted: (data) => {
      setProfileData(data.KIOSCO_getPerfilActivo);
      localStorage.setItem(
        'Perfil',
        JSON.stringify(data.KIOSCO_getPerfilActivo),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [getInfoKiosco] = useLazyQuery(GET_INFO_KIOSCO, {
    onCompleted: (data) => {
      localStorage.setItem(
        'InfoKiosco',
        JSON.stringify(data.KIOSCO_getInfoKiosco),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [getMenu] = useLazyQuery(GET_MENU, {
    onCompleted: (data) => {
      localStorage.setItem('Menu', JSON.stringify(data.KIOSCO_getMenu));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(guardarMenu(data.KIOSCO_getMenu));
    },
    onError: (error) => {
      console.log(error);
      const menu = localStorage.getItem('Menu');
      if (menu) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(guardarMenu(JSON.parse(menu)));
      }
    },
  });

  useEffect(() => {
    const storedPerfil = localStorage.getItem('Perfil');
    if (storedPerfil) {
      setProfileData(JSON.parse(storedPerfil));
    }

    getPerfil().then();
    getInfoKiosco().then();
    getMenu().then();
  }, []);

  return (
    <div className="relative mx-auto p-4 h-screen">
      <div
        className="absolute inset-0 bg-center bg-cover z-0 "
        style={{
          backgroundImage: `url(${profileData?.banner || ''})`,
          backgroundColor: profileData?.banner ? '' : 'var(--bg-primary)',
        }}
      ></div>
      <div className="relative ">
        <div className=" flex justify-evenly md:mt-[75%] lg:mt-[50%]">
          {profileData?.screens.aqui && (
            <button
              className="shadow-md md:h-[17rem] lg:h-[25rem]"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(actualizarTipoEntrega('AQUI'));
              }}
            >
              <Link to="/menu">
                <img
                  src="/icons_bienvenida/dine-in.svg"
                  alt="dine-in"
                  className="h-full"
                />
              </Link>
            </button>
          )}

          {profileData?.screens.llevar && (
            <button
              className="shadow-md md:h-[17rem] lg:h-[25rem]"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(actualizarTipoEntrega('LLEVAR'));
              }}
            >
              <Link to="/menu">
                <img
                  src="/icons_bienvenida/delivery.svg"
                  alt="img-delivery"
                  className="h-full"
                />
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
