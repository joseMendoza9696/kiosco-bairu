import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
//  import { Modal1 } from './Modal1';
import { Modal2 } from './Modal2';
import { agregarProducto } from '../../../redux/actions/nuevaOrden.action';

const Productos = () => {
  const dispatch = useDispatch();

  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );

  const productoSeleccionado = useSelector(
    (state: RootState) => state.menuSeleccionReducer.productoSeleccionado,
  );

  console.log('productoseleccionado', productoSeleccionado);

  const categoriaActual = useSelector(
    (state: RootState) => state.menuReducer.categorias[categoriaSeleccionada],
  );

  // const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  if (
    !categoriaActual ||
    !categoriaActual.subcategorias ||
    categoriaActual.subcategorias.length === 0
  ) {
    return <div>No hay productos disponibles</div>;
  }

  const productos = categoriaActual.subcategorias[0].productos;
  const handleOpenModal = (producto) => {
    // @ts-ignore
    dispatch(agregarProducto(producto));
    // @ts-ignore
    document.getElementById('my_modal_5').showModal();
  };

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

      <div className="flex flex-wrap mx-[56px] py-8  gap-y-8 overflow-auto overflow-y-auto max-h-[1200px]">
        {productos.map((producto) => (
          <button
            key={producto.id}
            className="flex flex-col mr-[32px] rounded-md shadow-md"
            onClick={() => {
              // TODO: AGREGAR PRODUCTO A NUEVA ORDEN
              handleOpenModal(producto);
            }}
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
              <p className="text-left text-gray-500 ">{producto.descripcion}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom  transition-all duration-800"
      >
        {/*TODO:logica para elegir el modal type*/}
        {/* <Modal1
          productoSeleccionado={productoSeleccionado}
          closeModal={() => document.getElementById('my_modal_5').close()}
        /> */}

        <Modal2
          productoSeleccionado={productoSeleccionado}
          handleOpenModal={handleOpenModal}
          closeModal={() => document.getElementById('my_modal_5').close()}
        />
      </dialog>
    </div>
  );
};

export default Productos;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
// 

export const seleccionarProducto = (idSistema: string) => (dispatch: any) => {
  dispatch({
    type: SELECCIONAR_PRODUCTO,
    payload: idSistema,
  });
};
///


console.log('initialMenuSeleccionState', initialMenuSeleccionState);

export function menuSeleccionReducer(
  state = initialMenuSeleccionState,
  action: any,
) {
  switch (action.type) {
    case SELECCIONAR_CATEGORIA:
      return { ...state, categoriaSeleccionada: action.payload };
    case SELECCIONAR_PRODUCTO:
      return { ...state, productoSeleccionado: action.payload };
    default:
      return state;
  }
}
