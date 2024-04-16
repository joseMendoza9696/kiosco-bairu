import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
}

interface CategoriasProps {
  categorias: Categoria[];
}

const Categoria: React.FC<CategoriasProps> = ({ categorias }) => {
  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );

  const handleClickCategoria = (index: number) => {
    dispatch({ type: 'SELECCIONAR_CATEGORIA', payload: index });
  };
  console.log(categorias);

  return (
    <>
      <div className="text-center pt-10 ">
        <h1 className="text-[48px] font-bold text-primary">
          Nuestras categorías
        </h1>
      </div>
      <div className="rounded-box w-full overflow-x-auto flex items-center justify-start   carousel   ">
        <div className="carousel-item pl-16 ">
          {categorias.map((categoria: Categoria, index: number) => (
            <button
              key={categoria.id}
              className={`mx-4 ${index === categoriaSeleccionada ? 'selected' : ''}`}
              onClick={() => handleClickCategoria(index)}
            >
              <div className="max-w-xs rounded-md shadow-md">
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
      </div>
    </>
  );
};

export default Categoria;
