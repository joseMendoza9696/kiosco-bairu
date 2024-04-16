import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Modal1 } from './Modal1';
import { Modal2 } from './Modal2';

const Productos = () => {
  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );

  const categoriaActual = useSelector(
    (state: RootState) => state.menuReducer.categorias[categoriaSeleccionada],
  );

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  if (
    !categoriaActual ||
    !categoriaActual.subcategorias ||
    categoriaActual.subcategorias.length === 0
  ) {
    return <div>No hay productos disponibles</div>;
  }

  const productos = categoriaActual.subcategorias[0].productos;

  const opcionesMenu = productos[0].opcionesMenu;

  const handleOpenModal = (producto) => {
    setProductoSeleccionado(producto);

    document.getElementById('my_modal_5').showModal();
  };

  return (
    <div className="pt-10 text-center">
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

      <div className="flex flex-wrap mx-[56px] space-y-8 ">
        {productos.map((producto) => (
          <button
            key={producto.id}
            className="flex flex-col mr-[32px] rounded-md shadow-md "
            onClick={() => handleOpenModal(producto)}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-[285px] h-[285px] rounded-xl object-cover"
            />
            <div className="ml-2">
              <h2 className="text-[20px] font-semibold text-left">
                {producto.nombre}
              </h2>
              <p className="text-left text-semibold text-lg">
                Bs. {producto.precio}
              </p>
              <p className="text-left text-gray-500">{producto.descripcion}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom  transition-all duration-800"
      >
        {/* <Modal1
          productoSeleccionado={productoSeleccionado}
          closeModal={() => document.getElementById('my_modal_5').close()}
        /> */}

        <Modal2
          productoSeleccionado={productoSeleccionado}
          closeModal={() => document.getElementById('my_modal_5').close()}
        />
      </dialog>
    </div>
  );
};

export default Productos;
