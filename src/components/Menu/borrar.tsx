import { useQuery } from '@apollo/client';
import { GET_MENU } from '../../api/graphql/query';
import { Footer } from '../../components/sharedComponents/Footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarMenu } from '../../redux/actions/menu.action';
import { RootState } from '../../redux/store';
import Categoria from './categorias';
import Productos from './productos';

interface Categoria {
  id: string;
  nombre: string;
  imagen: string;

export const Menu = () => {
  // TODO: QUITAR LOS QUERIES
  // TODO: EL MENU QUE VAS A UTILIZAR ES DEL REDUX menuReducer

  const dispatch = useDispatch();

  // const categoriass = useSelector(
  //   (state: RootState) => state.menuReducer.categorias,
  // );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // useEffect(() => {
  //   const { loading, error, data } = useQuery(GET_MENU);
  //   if (data) {
  //     // guardar en el local storage
  //     // guardar el state

  //     dispatch(guardarMenu({ categorias: data.KIOSCO_getMenu.categorias }));
  //   }
  // }, []);

  // if (loading) return <p>Cargando...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const categorias = data?.KIOSCO_getMenu?.categorias || [];
  // let productos: Producto[] = [];

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
        {/* <Categoria
          categorias={categorias}
          setSelectedCategory={setSelectedCategory}
        /> */}
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
        </div>

        {/* {selectedCategory ? (
          <div className="pt-10 text-center">
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
            <Productos productos={productos} />
          </div>
        ) : null} */}
        {/*TODO: PRODUCTOS.TSX END*/}
      </main>

      <Footer />
    </>
  );
};
