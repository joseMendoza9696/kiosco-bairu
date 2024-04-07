import { useDispatch, useSelector } from 'react-redux';
import { GET_MENU } from '../../api/graphql/query';
import { useState, useEffect } from 'react';
import { guardarMenu } from '../../redux/actions/menu.action';
import { useLazyQuery } from '@apollo/client';
import Categoria from './categorias';
import { RootState } from '../../redux/store';
import Productos from './productos';

export const Menu = () => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.menuReducer.categorias);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuReducer.categorias[0].seleccionada,
  );

  const [getCategorias] = useLazyQuery(GET_MENU, {
    onCompleted: (data) => {
      dispatch(guardarMenu({ categorias: data.KIOSCO_getMenu.categorias }));
      localStorage.setItem('Menu', JSON.stringify(data.KIOSCO_getMenu));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const productosCategoriaSeleccionada =
    categorias.find((categoria) => categoria.id === selectedCategory)
      ?.productos || [];

  useEffect(() => {
    getCategorias();
  }, []);

  const handleSeleccionarCategoria = (categoriaId: string) => {
    setSelectedCategory(categoriaId);
  };

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
        {/*TODO: MOVER LAS CATEGORIAS AL COMPONENTE CATEGORIAS.TSX*/}

        <Categoria
          categorias={categorias}
          setSelectedCategory={setSelectedCategory}
        />

        {/*TODO: CATEGORIAS.TSX END*/}

        {/*TODO: MOVER LOS PRODUCTOS AL COMPONENTE PRODUCTOS.TSX*/}
        <div className="pt-10 text-center ">
          <div className="flex items-center justify-between pl-16">
            <h1 className="text-4xl font-semibold text-primary">
              Escoge tu producto
            </h1>

            <button className="btn btn-secondary w-16 h-16 btn-circle mr-16">
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
            </button>
          </div>
          <Productos productos={productosCategoriaSeleccionada} />
        </div>
      </main>
    </>
  );
};
