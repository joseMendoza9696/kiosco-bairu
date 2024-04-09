import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Productos = () => {
  // contiene de productos tsx i reemplaza al produtctos tsx CHECK
  // contiene el popup de productos
  // solucionar el bug CHECK
  // redux necesita un tiempo para cargar los datos CHECK
  // cuando entre al array del menu
  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );

  const categoriaActual = useSelector(
    (state: RootState) => state.menuReducer.categorias[categoriaSeleccionada],
  );

  if (
    !categoriaActual ||
    !categoriaActual.subcategorias ||
    categoriaActual.subcategorias.length === 0
  ) {
    return <div>No hay productos disponibles</div>;
  }

  const productos = categoriaActual.subcategorias[0].productos;

  return (
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
      <div className="flex flex-wrap mx-[64px]">
        {productos.map((producto) => (
          <button
            key={producto.id}
            className="flex flex-col mr-[32px] py-8 rounded-md shadow-md  "
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-[285px] h-[285px] rounded-xl object-cover"
            />
            <div className="ml-2">
              <h2 className="text-[20px] font-semibold text-left ">
                {producto.nombre}
              </h2>
              <p className="text-left text-semibold text-lg">
                Bs. {producto.precio}
              </p>
              <p className="text-left">{producto.descripcion}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Productos;
