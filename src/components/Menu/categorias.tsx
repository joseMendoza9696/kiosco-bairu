import React from 'react';

interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
}

interface CategoriasProps {
  categorias: Categoria[];
  setSelectedCategory: (categoryId: string) => void;
}

const Categoria: React.FC<CategoriasProps> = ({
  categorias,
  setSelectedCategory,
}) => {
  return (
    <>
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
    </>
  );
};

export default Categoria;
