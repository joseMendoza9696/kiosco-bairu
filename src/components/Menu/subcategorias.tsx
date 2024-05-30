import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { seleccionarSubcategoria } from '../../redux/actions/menu.action';

interface ISubcategoria {
  categoriaSeleccionada: number;
}

export const Subcategorias = ({ categoriaSeleccionada }: ISubcategoria) => {
  const dispatch = useDispatch();

  const subcategorias = useSelector(
    (state: RootState) =>
      state.menuReducer.categorias[categoriaSeleccionada]?.subcategorias,
  );

  const subcategoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.subcategoriaSeleccionada,
  );

  const SubcategoriaSeleccionada = (index: number) => {
    // @ts-expect-error need to fix this
    dispatch(seleccionarSubcategoria(index));
  };

  return (
    <>
      {subcategorias.length > 1 ? (
        <div className="rounded-box overflow-x-auto flex items-center carousel pt-6">
          <div className="carousel-item pl-16">
            {subcategorias.map((subcategoria, index: number) => (
              <button
                key={subcategoria.id}
                className={`mx-4 relative rounded-xl p-4 dark:text-white ${
                  index === subcategoriaSeleccionada
                    ? 'bg-primary rounded-md'
                    : 'bg-secondary'
                }`}
                onClick={() => SubcategoriaSeleccionada(index)}
              >
                <div className="max-w-xs rounded-md  relative">
                  <h2 className="text-[24px] text-left font-semibold p-1">
                    {' '}
                    {subcategoria.nombre}{' '}
                  </h2>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}{' '}
    </>
  );
};
