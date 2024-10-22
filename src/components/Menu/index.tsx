import { useDispatch, useSelector } from 'react-redux';
import { GET_MENU, PROFILE_QUERY } from '../../api/graphql/query';
import { useEffect, useState } from 'react';
import { guardarMenu } from '../../redux/actions/menu.action';
import { useLazyQuery } from '@apollo/client';
import Categoria from './categorias';
import { RootState } from '../../redux/store';
import Productos from './Productos/index.tsx';
import { Footer } from '../sharedComponents/Footer.tsx';
import { Subcategorias } from './subcategorias';

export const Menu = () => {
  const dispatch = useDispatch();

  const categorias = useSelector(
    (state: RootState) => state.menuReducer.categorias,
  );
  // const leerEstado = useSelector((state: RootState) => state.nuevaOrdenReducer);
  // console.log(leerEstado);

  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );

  const [perfildata, setPerfilData] = useState<{
    contextStyle: { logo: string };
  } | null>(null);

  const [getCategorias] = useLazyQuery(GET_MENU, {
    onCompleted: (data) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(guardarMenu({ categorias: data.KIOSCO_getMenu.categorias }));
      localStorage.setItem('Menu', JSON.stringify(data.KIOSCO_getMenu));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    getCategorias().then();
  }, [getCategorias]);

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
      <header className="mx-16 md:my-[3%] dark:bg-primary fixed-top rounded-xl shadow-lg md:h-[5.5rem] lg:h-[6.5rem] py-3 flex justify-center">
        <img
          src={perfildata?.contextStyle.logo}
          alt="logo"
          className="rounded-full object-fill"
        />
      </header>
      <Categoria categorias={categorias} />

      <main className="overflow-hidden">
        <div className="flex items-center justify-between pl-16 md:mb-[3%]">
          <h1 className="md:text-3xl lg:text-5xl font-bold text-primary">
            Escoge tu producto
          </h1>
          {/* <button className="btn btn-secondary w-16 h-16 btn-circle mr-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */}
        </div>

        {/* CHECK */}
        <div className="w-screen">
          <Subcategorias categoriaSeleccionada={categoriaSeleccionada} />
        </div>

        <div className="w-screen pl-2">
          <Productos />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
