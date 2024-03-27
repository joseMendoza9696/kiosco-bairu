import { useQuery } from '@apollo/client';
import { GET_MENU } from '../api/graphql/query';
import { Footer } from './Footer';
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
}

export const Menu = () => {
  const { loading, error, data } = useQuery(GET_MENU);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categorias = data?.KIOSCO_getMenu?.categorias || [];
  const subcategorias =
    categorias.find((categoria: Categoria) => categoria.id === selectedCategory)
      ?.subcategorias || [];

  return (
    <>
      <header>
        <div className="p-6 py-12 dark:bg-primary dark:text-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <h2 className="text-center text-6xl tracking-tighter font-bold">
                Celebra a papá <br className="sm:hidden" />
                con 50% Off
              </h2>
              <div className="space-x-2 text-center py-2 lg:py-0">
                <span>con la promo </span>
                <span className="font-bold text-lg">bairu</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="text-center pt-10">
          <h1 className="text-5xl font-bold text-primary">
            Nuestras categorías
          </h1>
          <div className="carousel rounded-box bg-base-100 shadow-xl ">
            {categorias.map((categoria: Categoria) => (
              <button
                key={categoria.id}
                onClick={() => setSelectedCategory(categoria.id)}
              >
                <div
                  key={categoria.id}
                  className="carousel-item flex flex-col items-center"
                >
                  <figure>
                    <img
                      src={categoria.imagen}
                      alt={categoria.nombre}
                      className="w-30 h-20 rounded-xl"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{categoria.nombre}</h2>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-10 flex items-center navbar-center px-36">
          <h1 className="text-4xl font-bold text-secondary">
            Escoge tu producto
          </h1>
          <div className="navbar-end pl-80">
            <button className="btn btn-secondary w-16 h-16 btn-circle">
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
        <div className="carousel rounded-box py-">
          {subcategorias.map((subcategoria: Subcategoria) => (
            <div
              key={subcategoria.id}
              className="carousel-item flex flex-col items-center"
            >
              {/* Contenido de cada subcategoría */}
              <img
                src={subcategoria.imagen}
                alt={subcategoria.nombre}
                className="w-full"
              />
              <h2 className="text-lg mt-2">{subcategoria.nombre}</h2>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};
