import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GET_INFO_KIOSCO,
  GET_MENU,
  PROFILE_QUERY,
} from '../../api/graphql/query';
import { Icon } from '@iconify/react';
// REDUX
import { useDispatch } from 'react-redux';
import { guardarMenu } from '../../redux/actions/menu.action.ts';
// import { RootState } from '../../redux/store.ts';
import { actualizarTipoEntrega } from '../../redux/actions/nuevaOrden.action.ts';
import { Link } from 'react-router-dom';

export const Bienvenida = () => {
  // TODO: quitar: opcidad, logo, mensaje, "powered by bairu.io". Imagen y botones only.
  // check

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
      console.log(data);
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
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <div className="flex justify-center mt-8 space-x-20 pt-[500px]">
          {profileData?.screens.aqui && (
            <button
              className="mx-4 px-6 py-3 btn text-2xl w-72 h-72 flex flex-col items-center justify-center rounded-3xl"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(actualizarTipoEntrega('AQUI'));
              }}
            >
              <Link
                to="/menu"
                className="w-full h-full flex items-center justify-center"
              >
                <div className="flex flex-col items-center ">
                  <Icon
                    icon="zondicons:location-food"
                    className="text-[112px] mb-6 text-primary "
                  />
                  <span className="text-[36px] text-primary">Comer aquí</span>
                </div>
              </Link>
            </button>
          )}

          {profileData?.screens.llevar && (
            <button
              className="mx-4 px-6 py-3 btn text-2xl w-72 h-72 flex flex-col items-center justify-center rounded-3xl"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(actualizarTipoEntrega('LLEVAR'));
              }}
            >
              <Link
                to="/menu"
                className="w-full h-full flex items-center justify-center"
              >
                <div className="flex flex-col items-center ">
                  <Icon
                    icon="fa6-solid:basket-shopping"
                    className="text-[128px] mb-6 text-primary"
                  />
                  <span className="text-[36px] text-primary">Para llevar</span>
                </div>
              </Link>
            </button>
          )}
        </div>
        <div className="flex justify-center mt-[400px]"></div>
      </div>
    </div>
  );
};
