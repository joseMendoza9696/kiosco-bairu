import { useQuery } from '@apollo/client';
import { GET_MENU } from '../api/graphql/query';
import { Footer } from '../components/sharedComponents/Footer';
import { useState } from 'react';

console.log(GET_MENU);

interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
}
interface Subcategoria {
  id: string;
  nombre: string;
  imagen: string;
  productos: Producto[];
}

interface Producto {
  id: string;
  idSistema: string;
  nombre: string;
  imagen: string;
  precio: number;
  descripcion: string;
}

export const Menu = () => {
  const { loading, error, data } = useQuery(GET_MENU);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categorias = data?.KIOSCO_getMenu?.categorias || [];
  let productos: Producto[] = [];

  if (selectedCategory) {
    const categoriaSeleccionada = categorias.find(
      (categoria: Categoria) => categoria.id === selectedCategory,
    );
    if (categoriaSeleccionada) {
      categoriaSeleccionada.subcategorias.forEach(
        (subcategoria: Subcategoria) => {
          productos = [...productos, ...subcategoria.productos];
        },
      );
    }
  }

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
        <div className="text-center pt-10">
          <h1 className="text-[48px] font-bold text-primary">
            Nuestras categorías
          </h1>
        </div>
        <div className="rounded-box w-full overflow-x-auto flex items-center justify-start pl-16">
          {categorias.map((categoria: Categoria) => (
            <button
              key={categoria.id}
              onClick={() => setSelectedCategory(categoria.id)}
              className="mx-4"
            >
              <div key={categoria.id} className="max-w-xs rounded-md shadow-md">
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="w-[200px] h-[167px] rounded-xl object-cover"
                />
                <h2 className="text-[24px] text-left font-semibold p-1">
                  {categoria.nombre}
                </h2>
              </div>
            </button>
          ))}
        </div>

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
        {selectedCategory ? (
          <div className="flex flex-wrap  mx-[64px] ">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="flex flex-col mr-[32px] py-8  rounded-md shadow-md bg-white"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-[285px] h-[285px] rounded-xl object-cover "
                />
                <div className="ml-2">
                  <h2 className="text-[20px] font-semibold text-left ">
                    {producto.nombre}
                  </h2>
                  <p className="text-left text-semibold text-lg">
                    {' '}
                    Bs. {producto.precio}
                  </p>
                  <p className="text-left">{producto.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </main>

      <Footer />
    </>
  );
};
