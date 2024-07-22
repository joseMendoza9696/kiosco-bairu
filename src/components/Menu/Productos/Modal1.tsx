// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { useState } from 'react';
import {
  editarCantidadProducto,
  quitarUltimoProducto,
  actualizarCuentaTotal,
} from '../../../redux/actions/nuevaOrden.action.ts';
import { NotesProduct } from './NotesProduct.tsx';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { Producto } from '../../../interfaces/menu.interface.ts';

interface IModal1 {
  closeModal: any;
}

export const Modal1 = ({ closeModal }: IModal1) => {
  const dispatch = useDispatch();
  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const productoSeleccionadoIndex =
    useSelector((state: RootState) => state.nuevaOrdenReducer.productos)
      .length - 1;

  const productoSeleccionado = useSelector(
    (state: RootState) =>
      state.nuevaOrdenReducer.productos[
        state.nuevaOrdenReducer.productos.length - 1
      ],
  );

  const [cantidad, setCantidad] = useState<number>(1);

  // FUNCTIONS
  const agregarProductoACanasta = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(actualizarCuentaTotal());
    closeModal();
    setCantidad(1);
  };

  const editarCantidad = (incremento: number) => {
    setCantidad((cantidadPrevia) => {
      const cantidadNueva = cantidadPrevia + incremento;
      const cantidadMinima = Math.max(cantidadNueva, 1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(editarCantidadProducto(productoSeleccionadoIndex, incremento));
      return cantidadMinima;
    });
  };
  const notasProductos = PerfilLocalStorage?.notas_productos;

  const monedaPerfil = PerfilLocalStorage?.moneda;

  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box bg-base-100 rounded-t-[5.625rem] h-[87%] px-24 pt-44">
          {/* button close modal */}
          <form
            method="dialog"
            className="absolute top-0 left-[calc(50%-5.375rem)]"
          >
            <button
              className="btn rounded-t-none rounded-b-3xl h-28 w-48"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(quitarUltimoProducto());
                setCantidad(1);
              }}
            >
              <Icon
                icon="material-symbols-light:close"
                width="3rem"
                height="3rem"
              />
            </button>
          </form>
          {/* product image */}
          <div className="flex justify-center mb-10">
            <img
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="w-[31rem] h-[31rem] rounded-3xl object-cover"
            />
          </div>
          {/* name product and notes */}
          <h2 className="font-bold text-7xl text-center mb-8">
            {productoSeleccionado.nombre}
          </h2>
          {/* description */}
          {productoSeleccionado.descripcion && (
            <p className="py-4 text-3xl text-center text-[#A6A6AA] mb-8">
              {productoSeleccionado.descripcion}
            </p>
          )}
          {/* price */}
          <span className="block text-center text-5xl font-bold mb-16">
            {monedaPerfil} {productoSeleccionado.precioTotal}
          </span>
          {/*//! OPTIONS PRODUCT */}
          <div className="flex justify-between items-center w-[45%] mx-auto relative mb-28">
            {/* MINUS */}
            <button
              disabled={cantidad <= 1}
              className="btn w-36 h-20 rounded-3xl"
              onClick={() => {
                editarCantidad(-1);
              }}
            >
              <Icon width="3rem" height="3rem" icon="icomoon-free:minus" />
            </button>
            {/* AMOUNT */}
            <span className="text-5xl font-bold">{cantidad}</span>
            {/* PLUS */}
            <button
              className="btn w-36 h-20 rounded-3xl text-white btn-primary"
              onClick={() => {
                editarCantidad(1);
              }}
            >
              <Icon width="3rem" height="3rem" icon="icomoon-free:plus" />
            </button>
            {notasProductos && <NotesProduct></NotesProduct>}
          </div>
          {/* BUTTONS: cancel minus amount plus add */}
          <div className="w-[85%] mx-auto flex justify-between items-center">
            {/* CANCEL */}
            <button
              className="btn text-5xl w-80 rounded-3xl h-44 font-semibold"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(quitarUltimoProducto());
                closeModal();
                setCantidad(1);
              }}
            >
              Cancelar
            </button>
            {/* ADD */}
            <button
              className="btn text-5xl w-80 rounded-3xl h-44 text-white font-semibold btn-primary"
              onClick={agregarProductoACanasta}
            >
              Añadir
            </button>
          </div>
        </div>
      )}
    </>
  );
};
