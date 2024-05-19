import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Subcategorias {
  id: string;
  nombre: string;
  imagen: string;
}
export interface SubcategoriasProps {
  subcategorias: Subcategorias[];
}
export const Subcategorias: React.FC<SubcategoriasProps> = ({
  subcategorias,
}) => {
  const dispatch = useDispatch();
  const subcategoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.subcategoriaSeleccionada,
  );
  const SubcategoriaSeleccionada = (index: number) => {
    dispatch({ type: 'SELECCIONAR_SUBCATEGORIA', payload: index });
  };
  console.log(subcategoriaSeleccionada);

  return (
    <>
      <div className="rounded-box overflow-x-auto flex items-center  carousel ">
        <div className="carousel-item pl-16">
          {subcategorias.map((subcategoria: Subcategorias, index: number) => (
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
