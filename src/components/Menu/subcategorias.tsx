import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

// @ts-expect-error need to fix this
export const Subcategorias = ({ categoriaSeleccionada }) => {
  // TODO:  aqui utilizar el useSelector de subcategorias de menuReducer
  const dispatch = useDispatch();

  const subcategorias = useSelector(
    (state: RootState) =>
      state.menuReducer.categorias[categoriaSeleccionada].subcategorias,
  );

  const subcategoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.subcategoriaSeleccionada,
  );
  const SubcategoriaSeleccionada = (index: number) => {
    dispatch({ type: 'SELECCIONAR_SUBCATEGORIA', payload: index });
  };

  return (
    <>
      <div className="rounded-box overflow-x-auto flex items-center  carousel ">
        <div className="carousel-item pl-16">
          {subcategorias.map((subcategoria, index: number) => (
            <button
              key={subcategoria.id}
              className={`mx-4 relative rounded-xl bg-white ${
                index === subcategoriaSeleccionada
                  ? 'border-8 border-primary rounded-md'
                  : ''
              }`}
              onClick={() => SubcategoriaSeleccionada(index)}
            >
              <div className="max-w-xs rounded-md shadow-md relative">
                <h2 className="text-[24px] text-left font-semibold p-1">
                  {' '}
                  {subcategoria.nombre}{' '}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
