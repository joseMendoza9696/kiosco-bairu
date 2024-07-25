import { useState } from 'react';
import { Modal1 } from './Modal1';
import { Modal2 } from './Modal2';
import { Producto } from '../../../interfaces/menu.interface.ts';
// REDUX
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { agregarProducto } from '../../../redux/actions/nuevaOrden.action.ts';

const Productos = () => {
  const carrito = useSelector(
    (state: RootState) => state.nuevaOrdenReducer.productos.length,
  );

  const dispatch = useDispatch();
  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );
  const categoriaActual = useSelector(
    (state: RootState) => state.menuReducer.categorias[categoriaSeleccionada],
  );
  const categorias = useSelector(
    (state: RootState) => state.menuReducer.categorias,
  );

  const subcategorias = useSelector(
    (state: RootState) =>
      state.menuReducer.categorias[categoriaSeleccionada].subcategorias,
  );
  const subcategoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.subcategoriaSeleccionada,
  );

  const [modal2, setModal2] = useState<boolean>(false);

  if (
    !categoriaActual ||
    !categoriaActual.subcategorias ||
    categoriaActual.subcategorias.length === 0
  ) {
    return <div>No hay productos disponibles</div>;
  }

  const productos =
    categoriaActual.subcategorias[subcategoriaSeleccionada]?.productos;

  const seleccionarProducto = (producto: Producto) => {
    // hace la logica del modal
    // mostrar modal1 o modal2
    if (producto.opcionesMenu.length > 0) {
      setModal2(true);
    } else {
      setModal2(false);
    }
    // @ts-expect-error need to fix this
    document.getElementById('my_modal_5').showModal();

    // MANDAR PRODUCTO A NUEVA ORDEN REDUCER
    const newOpcionesMenu = producto.opcionesMenu.map((opMen) => {
      const nuevoOpMen = {
        id: opMen.id,
        idSistema: opMen.idSistema,
        nombre: opMen.nombre,
        seleccion: opMen.seleccion,
        cantidadSeleccion: opMen.cantidadSeleccion,
        cantidadSeleccionada: 0,
        obligatorio: opMen.obligatorio,
      };
      const opciones = opMen.opciones.map((o) => ({
        ...o,
        seleccionado: false,
      }));
      return { ...nuevoOpMen, opciones: opciones };
    });

    dispatch(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      agregarProducto({
        id: producto.id,
        idSistema: producto.idSistema,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        cantidad: 1,
        precioOriginal: producto.precio,
        precioMasOpciones: producto.precio,
        precioTotal: producto.precio,
        imagen: producto.imagen,
        categoriaId: categorias[categoriaSeleccionada].id,
        subcategoriaId: subcategorias[subcategoriaSeleccionada].id,
        subcategoriaNombre: subcategorias[subcategoriaSeleccionada].nombre,
        opcionesMenu: newOpcionesMenu,
      }),
    );
  };
  const saltoDeLinea = (title: string) => {
    if (title.length > 10) {
      return title.slice(0, 22) + (title.length > 10 ? '' : '');
    }
    return title;
  };
  const saltoDeLineaDescripcion = (title: string) => {
    if (title.length > 10) {
      return title.slice(0, 28) + (title.length > 10 ? '' : '');
    }
    return title;
  };
  const monedaPerfil = PerfilLocalStorage?.moneda;
  // ? carrito + subcategoria TRUE: md:max-h-[40vh] lg:max-h-[50vh]  FALSE: md:max-h-[49vh] lg:max-h-[59vh]
  // ? solo Carrito sin subcategoria TRUE: md:max-h-[48vh] lg:max-h-[56vh]   FALSE:  md:max-h-[57vh] lg:max-h-[65vh]
  return (
    <div className="text-center">
      <div
        className={`flex flex-wrap justify-between overflow-y-auto scroll-hidden md:mx-[7vw] lg:mx-[5.5vw] ${
          carrito && categoriaActual.subcategorias.length > 1
            ? 'md:max-h-[40vh] lg:max-h-[50vh]'
            : carrito
              ? 'md:max-h-[48vh] lg:max-h-[56vh]'
              : categoriaActual.subcategorias.length > 1
                ? 'md:max-h-[49vh] lg:max-h-[59vh]'
                : 'md:max-h-[57vh] lg:max-h-[65vh]'
        }`}
      >
        {productos.map((producto: Producto) => (
          <button
            key={producto.id}
            className="rounded-lg shadow-md border-2 bg-white flex flex-col mb-3 w-[32%]"
            onClick={() => {
              seleccionarProducto(producto);
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full md:h-[13rem] lg:h-[285px] rounded-t-xl object-cover"
            />
            <div className="p-4">
              <h2 className="lg:text-2xl md:text-xl font-bold text-left mb-2">
                {saltoDeLinea(producto.nombre)}
              </h2>
              <p className="text-left font-semibold  lg:text-lg mb-2">
                {monedaPerfil} {producto.precio}
              </p>
              {producto.descripcion && (
                <p className="text-left text-gray-500 ">
                  {saltoDeLineaDescripcion(producto.descripcion)}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom  transition-all duration-800"
      >
        {modal2 ? (
          <Modal2
            // productoSeleccionado={productoSeleccionado}
            // @ts-expect-error need to fix this  posibility nullnull
            closeModal={() => document.getElementById('my_modal_5').close()}
          />
        ) : (
          <Modal1
            // productoSeleccionado={productoSeleccionado}
            // @ts-expect-error need to fix this  posibility nullnull
            closeModal={() => document.getElementById('my_modal_5').close()}
          />
        )}
      </dialog>
    </div>
  );
};

export default Productos;
