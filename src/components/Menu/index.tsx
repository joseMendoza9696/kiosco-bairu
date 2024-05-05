import { useDispatch, useSelector } from 'react-redux';
import { GET_MENU, PROFILE_QUERY } from '../../api/graphql/query';
import { useEffect, useState } from 'react';
import { guardarMenu } from '../../redux/actions/menu.action';
import { useLazyQuery } from '@apollo/client';
import Categoria from './categorias';
import { RootState } from '../../redux/store';
import Productos from './Productos/index.tsx';
import { Footer } from '../sharedComponents/Footer.tsx';

export const Menu = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(
    (state: RootState) => state.menuReducer.categorias,
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
    getCategorias();
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
    getPerfil();
  }, [getPerfil]);

  return (
    <>
      <header className="mx-16 mt-10  fixed-top">
        <div className="p-6  dark:bg-primary dark:text-gray-50 rounded-xl shadow-lg">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center">
              <img
                src={perfildata?.contextStyle.logo}
                alt="logo"
                className="rounded-full h-[80px] w-[80px] mr-4"
              />
            </div>
          </div>
        </div>
      </header>
      <Categoria categorias={categorias} />
      <main className="overflow-hidden">
        {/* CATEGORIAS.TSX*/}

        {/*CATEGORIAS.TSX END*/}

        {/*PRODUCTOS.TSX*/}

        <div className="max-w-6xl mx-auto py-8 overflow-y-auto max-h-[calc(100vh - 200px)]">
          <Productos />
        </div>

        {/*PRODUCTOS.TSX END*/}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
