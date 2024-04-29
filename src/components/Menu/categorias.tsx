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
  // TODO: CUANDO SE SELECCIONE LA CATEGORIA DEBE ESTAR RESALTADA COMO EN FIGMA
  // TODO: SI EL TITULO DE LA CATEGORIA ES LARGO, AGREGAR UN SALTO DE LINEA PARA EVITAR EL DESFACE.

  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );

  const handleClickCategoria = (index: number) => {
    dispatch({ type: 'SELECCIONAR_CATEGORIA', payload: index });
  };
  console.log(categorias);

  const saltoDeLinea = (title: string) => {
    if (title.length > 10) {
      return title.split(' ').join('\n');
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
        <div className="carousel-item pl-16 ">
          {categorias.map((categoria: Categoria, index: number) => (
            <button
              key={categoria.id}
              className={`mx-4  focus:outline-none focus:ring focus:ring-primary rounded-xl ${index === categoriaSeleccionada ? 'selected' : ''}`}
              onClick={() => handleClickCategoria(index)}
            >
              <div className="max-w-xs rounded-md shadow-md">
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="w-[200px] h-[167px] rounded-xl object-cover"
                />
                <h2 className="text-[24px] text-left font-semibold p-1">
                  {saltoDeLinea(categoria.nombre)}
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
