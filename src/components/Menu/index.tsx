import { useDispatch, useSelector } from 'react-redux';
import { GET_MENU } from '../../api/graphql/query';
import { useEffect } from 'react';
import { guardarMenu } from '../../redux/actions/menu.action';
import { useLazyQuery } from '@apollo/client';
import Categoria from './categorias';
import { RootState } from '../../redux/store';
import Productos from './Productos/index.tsx';

export const Menu = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(
    (state: RootState) => state.menuReducer.categorias,
  );

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
  }, []);

  return (
    <>
      <header className="mx-16 mt-10 ">
        <div className="p-6 py-12 dark:bg-primary dark:text-gray-50 rounded-xl shadow-lg">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between text-center">
              hello
            </div>
          </div>
        </div>
      </header>
      <main>
        {/* CATEGORIAS.TSX*/}

        <Categoria categorias={categorias} />

        {/*CATEGORIAS.TSX END*/}

        {/*PRODUCTOS.TSX*/}

        <Productos />

        {/*PRODUCTOS.TSX END*/}
      </main>
    </>
  );
};
