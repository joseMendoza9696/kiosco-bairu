import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MENU, PROFILE_QUERY } from '../../api/graphql/query';
import { Footer } from '../../components/sharedComponents/Footer';
import { Icon } from '@iconify/react';
// REDUX
import { useDispatch } from 'react-redux';
import { guardarMenu } from '../../redux/actions/menu.action.ts';
// import { RootState } from '../../redux/store.ts';

export const Bienvenida = () => {
  const dispatch = useDispatch();

  // const menu = useSelector((state: RootState) => state.menuReducer);

  const [profileData, setProfileData] = useState<{
    contextStyle: { logo: string };
  } | null>(null);

  const [getPerfil] = useLazyQuery(PROFILE_QUERY, {
    onCompleted: (data) => {
      // TODO: QUITAR ESTE SETPROFILEDATA

      setProfileData(data.KIOSCO_getPerfilActivo);
      // TODO: GUARDAR ESTE PERFIL EN EL LOCAL STORAGE: NUEVA VARIABLE QUE SE LLAMA "PERFIL"
      localStorage.setItem(
        'Perfil',
        JSON.stringify(data.KIOSCO_getPerfilActivo),
      );
    },
    onError: (error) => {
      console.log(error);
      // TODO: NO HACES NADA
    },
  });

  const [getMenu] = useLazyQuery(GET_MENU, {
    onCompleted: (data) => {
      console.log(data);
      // TODO: GUARDAR EL MENU EN EL LOCALSTORAGE EN UNA NUEVA VARIABLE: "MENU"
      localStorage.setItem('Menu', JSON.stringify(data.KIOSCO_getMenu));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(guardarMenu(data.KIOSCO_getMenu));
    },
    onError: (error) => {
      console.log(error);
      // TODO: OBTENER EL MENU DEL LOCAL STORAGE
      const menu = localStorage.getItem('Menu');
      if (menu) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // TODO: ACTUALIZAR EL ESTADO DE REDUX: "initialMenuState" CON LA INFORMACION DEL MENU DEL LOCALSTORAGE

        dispatch(guardarMenu(JSON.parse(menu)));
      }
    },
  });

  useEffect(() => {
    // TODO: OBTENER EL PEFIL DEL LOCALSTORAGE Y ACTUALIZAR EN profileData
    const storedPerfil = localStorage.getItem('Perfil');
    if (storedPerfil) {
      setProfileData(JSON.parse(storedPerfil));
    }

    getPerfil().then();
    getMenu().then();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex justify-center items-center pb-[174px] pt-86">
        <img
          src={profileData?.contextStyle.logo}
          alt="logo"
          className="rounded-full h-[192px] w-[207px] mr-4"
        />
      </div>
      <div>
        <h1 className=" lg:text-[100px] font-bold text-dark text-center ">
          <div className="px-10">LA VIDA ES MÁS FÁCIL PIDIENDO ASÍ</div>
        </h1>
        <span className="p-2">
          <Icon
            icon="mdi:arrow-down-bold"
            style={{
              height: '190px',
              width: ' 190px',
              margin: '10 auto',
            }}
          />
        </span>
      </div>
      <div className="flex justify-center mt-8 space-x-20 ">
        <button className="mx-4 px-6 py-3 btn btn-primary btn-secondary text-2xl w-72 h-72 flex flex-col items-center justify-center rounded-3xl">
          <a href="/menu">
            <div className="flex flex-col items-center">
              <Icon
                icon="zondicons:location-food"
                className="text-[112px] mb-6 "
              />
              <span className="text-[36px]">Comer aquí</span>
            </div>
          </a>
        </button>
        <button className="mx-4 px-6 py-3 btn btn-primary btn-secondary text-2xl w-72 h-72 flex flex-col items-center justify-center rounded-3xl">
          <a href="/menu">
            <div className="flex flex-col items-center">
              <Icon
                icon="fa6-solid:basket-shopping"
                className="text-[128px] mb-6"
              />
              <span className="text-[36px]">Para llevar</span>
            </div>
          </a>
        </button>
      </div>

      <Footer />
    </div>
  );
};
