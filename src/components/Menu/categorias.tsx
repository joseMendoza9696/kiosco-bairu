import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { seleccionarSubcategoria } from '../../redux/actions/menu.action.ts';

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
    // @ts-expect-error need to fix this
    dispatch(seleccionarSubcategoria(0));
  };

  const saltoDeLinea = (title: string) => {
    if (title.length > 10) {
      return title.slice(0, 15) + (title.length > 10 ? '' : '');
    }
    return title;
  };

  return (
    <>
      <div className="text-center md:mb-[3%]">
        <h1 className="md:text-4xl lg:text-5xl font-bold text-primary">
          Nuestras categorías
        </h1>
      </div>
      <div className="rounded-box w-full overflow-x-auto flex items-center justify-start carousel md:mb-[3%]">
        <div className="carousel-item pl-16">
          {categorias.map((categoria: Categoria, index: number) => (
            <button
              key={categoria.id}
              className={`mr-4 relative rounded-xl bg-white ${index === categoriaSeleccionada ? 'border-4 border-primary rounded-md' : ''}`}
              onClick={() => handleClickCategoria(index)}
            >
              <div className="max-w-xs rounded-md shadow-md relative md:w-[160px] lg:w-[200px]">
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="md:w-[160px] md:h-[160px] lg:w-auto lg:h-[200px] rounded-xl object-contain"
                />
                <h2 className="md:text-xl lg:text-2xl text-left font-semibold p-1 capitalize whitespace-nowrap  overflow-hidden">
                  {saltoDeLinea(categoria.nombre)}
                </h2>
                {index === categoriaSeleccionada && (
                  <div className="absolute top-2 right-2">
                    <Icon
                      icon="ei:check"
                      className="text-primary stroke-current lg:w-[3rem] lg:h-[3rem] md:w-[2.5rem] md:h-[2.5rem]"
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
