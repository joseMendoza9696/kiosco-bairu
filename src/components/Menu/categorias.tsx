import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
}

interface CategoriasProps {
  categorias: Categoria[];
}

const Categoria: React.FC<CategoriasProps> = ({ categorias }) => {
  // TODO: SI EL TITULO DE LA CATEGORIA ES LARGO, AGREGAR UN SALTO DE LINEA PARA EVITAR EL DESFACE.

  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );

  const handleClickCategoria = (index: number) => {
    dispatch({ type: 'SELECCIONAR_CATEGORIA', payload: index });
  };

  const saltoDeLinea = (title: string) => {
    if (title.length > 10) {
      return title.slice(0, 15) + (title.length > 10 ? '' : '');
    }
    return title;
  };

  return (
    <>
      <div className="text-center pt-10 ">
        <h1 className="text-[48px] font-bold text-primary">
          Nuestras categorías
        </h1>
      </div>
      <div className="rounded-box w-full overflow-x-auto flex items-center justify-start carousel py-4">
        <div className="carousel-item pl-16">
          {categorias.map((categoria: Categoria, index: number) => (
            <button
              key={categoria.id}
              className={`mx-4 relative rounded-xl bg-white ${index === categoriaSeleccionada ? 'border-8 border-primary rounded-md' : ''}`}
              onClick={() => handleClickCategoria(index)}
            >
              <div className="max-w-xs rounded-md shadow-md relative">
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="w-[200px] h-[167px] rounded-xl object-cover"
                />
                <h2 className="text-[24px] text-left font-semibold p-1">
                  {saltoDeLinea(categoria.nombre)}
                </h2>
                {index === categoriaSeleccionada && (
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <Icon
                      icon="ei:check"
                      className="text-primary w-[45px] h-[45px] stroke-current"
                    />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categoria;
