import { Icon } from '@iconify/react/dist/iconify.js';
import { NotesProduct } from '../Menu/Productos/NotesProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  modificarCantidadProducto,
  vaciarEditarProductoOrden,
} from '../../redux/actions/editarOrden.action';

export const Modal1 = () => {
  const dispatch = useDispatch();
  const editOrder = useSelector((state: RootState) => state.editarOrdenReducer);

  // TODO: poner el tipo de moneda en base a "moneda" del perfil activo -> del local storage
  const perfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
  //? GET CURRENCY Local
  const currencyLocal = perfilLocalStorage.moneda;
  const storageNotes = perfilLocalStorage.notas_productos;

  //! update button
  const updateBtn = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(vaciarEditarProductoOrden());
  };
  //!cancel button
  const closeBtn = () => {
    (document.getElementById('checkout1') as HTMLDialogElement).close();
  };
  return (
    <dialog id="checkout1" className="modal modal-bottom">
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
              dispatch(vaciarEditarProductoOrden());
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
            src={editOrder.imagen}
            alt={editOrder.nombre}
            className="w-[31rem] h-[31rem] rounded-3xl object-cover"
          />
        </div>
        {/* name product and notes */}
        <h2 className="font-bold text-7xl text-center mb-8">
          {editOrder.nombre}
        </h2>
        {/* description */}
        {editOrder.descripcion && (
          <p className="py-4 text-3xl text-center text-[#A6A6AA] mb-8">
            {editOrder.descripcion}
          </p>
        )}
        {/* price */}
        <span className="block text-center text-5xl font-bold mb-16">
          {currencyLocal} {parseFloat(editOrder.precioTotal).toFixed(2)}
        </span>
        {/*//! OPTIONS PRODUCT */}
        <div className="flex justify-between items-center w-[45%] mx-auto relative mb-28">
          {/* MINUS */}
          <button
            disabled={editOrder.cantidad <= 1}
            className="btn w-36 h-20 rounded-3xl"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(modificarCantidadProducto(-1))
            }
          >
            <Icon width="3rem" height="3rem" icon="icomoon-free:minus" />
          </button>
          {/* AMOUNT */}
          <span className="text-5xl font-bold">{editOrder.cantidad}</span>
          {/* PLUS */}
          <button
            className="btn w-36 h-20 rounded-3xl text-white btn-primary"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(modificarCantidadProducto(1))
            }
          >
            <Icon width="3rem" height="3rem" icon="icomoon-free:plus" />
          </button>
          {storageNotes && <NotesProduct></NotesProduct>}
        </div>
        {/* BUTTONS cancel minus amount plus procedd */}
        <div className="w-[85%] mx-auto flex justify-between items-center">
          {/* BACK, CANCEL */}
          <button
            className="btn text-5xl w-80 rounded-3xl h-44 font-semibold"
            onClick={closeBtn}
          >{`Cancelar`}</button>
          {/* ADD, CONTINUE */}
          <button
            className="btn text-5xl w-80 rounded-3xl h-44 text-white font-semibold btn-primary"
            onClick={updateBtn}
          >{`Actualizar`}</button>
        </div>
      </div>
    </dialog>
  );
};
