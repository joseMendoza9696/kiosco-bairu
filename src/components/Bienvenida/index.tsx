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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-h-dvh w-full bg-cover bg-top flex items-end"
      style={{
        backgroundImage: `url(${profileData?.banner || ''})`,
        backgroundColor: profileData?.banner ? '' : 'var(--bg-primary)',
      }}
    >
      <div className="flex justify-evenly items-center w-full mb-[22vh]">
        {profileData?.screens.aqui && (
          <Link to="/menu">
            <button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(actualizarTipoEntrega('AQUI'));
              }}
            >
              <img
                src="/icons_bienvenida/dine-in.svg"
                alt="dine-in"
                className="w-[17rem] lg:w-[20rem]"
              />
            </button>
          </Link>
        )}

        {profileData?.screens.llevar && (
          <Link to="/menu">
            <button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(actualizarTipoEntrega('LLEVAR'));
              }}
            >
              <img
                src="/icons_bienvenida/delivery.svg"
                alt="img-delivery"
                className="w-[17rem] lg:w-[20rem]"
              />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
