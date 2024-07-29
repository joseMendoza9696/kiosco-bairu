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
      <div className="modal-box bg-base-100 rounded-t-[5.625rem] md:h-[92%] lg:h-[87%] md:px-10 md:pt-24 lg:px-24 lg:pt-44">
        {/* button close modal */}
        <form method="dialog">
          <button
            className="btn rounded-t-none rounded-b-3xl absolute top-0 md:left-[calc(50%-5rem)] lg:left-[calc(50%-5.375rem)] md:h-20 md:w-40 lg:h-28 lg:w-48 text-5xl"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(vaciarEditarProductoOrden());
            }}
          >
            <Icon icon="material-symbols-light:close" />
          </button>
        </form>
        {/* product image */}
        <div className="object-cover md:h-[26rem] lg:h-[25rem] md:mb-4 lg:mb-10">
          <img
            src={editOrder.imagen}
            alt={editOrder.nombre}
            className="h-full overflow-hidden object-center mx-auto rounded-3xl"
          />
        </div>
        {/* name product */}
        <h2 className="font-bold md:text-5xl lg:text-7xl text-center md:mb-4 lg:mb-8">
          {editOrder.nombre}
        </h2>
        {/* description */}
        {editOrder.descripcion && (
          <p className="md:text-2xl lg:text-3xl text-center text-[#A6A6AA] md:mb-4 lg:mb-8">
            {editOrder.descripcion}
          </p>
        )}
        {/* price */}
        <span className="block text-center md:text-4xl lg:text-5xl  font-bold md:mb-8 lg:mb-16 text-primary">
          {currencyLocal} {parseFloat(editOrder.precioTotal).toFixed(2)}
        </span>
        {/*//! OPTIONS PRODUCT */}
        <div className="flex justify-between items-center w-[55%] mx-auto relative md:mb-14 lg:mb-28">
          {/* MINUS */}
          <button
            disabled={editOrder.cantidad <= 1}
            className="btn h-max box-content flex justify-center md:py-[0.3em] md:px-[1em] lg:py-[0.4em] md:text-5xl lg:text-6xl rounded-3xl"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(modificarCantidadProducto(-1))
            }
          >
            <Icon icon="icomoon-free:minus" />
          </button>
          {/* AMOUNT */}
          <span className="text-5xl font-bold">{editOrder.cantidad}</span>
          {/* PLUS */}
          <button
            className="btn h-max box-content flex justify-center md:py-[0.3em] md:px-[1em] lg:py-[0.4em] md:text-5xl lg:text-6xl rounded-3xl text-white btn-primary"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(modificarCantidadProducto(1))
            }
          >
            <Icon icon="icomoon-free:plus" />
          </button>
          {storageNotes && <NotesProduct></NotesProduct>}
        </div>
        {/* BUTTONS cancel minus amount plus procedd */}
        <div className="mx-auto flex justify-between items-center md:w-[83%] lg:w-[85%]">
          {/* BACK, CANCEL */}
          <button
            className="btn box-content font-semibold rounded-3xl md:text-3xl lg:text-4xl md:py-[1.8em] md:w-[7em] lg:w-[7.5em]"
            onClick={closeBtn}
          >{`Cancelar`}</button>
          {/* ADD, CONTINUE */}
          <button
            className="btn box-content text-white font-semibold rounded-3xl btn-primary md:text-3xl lg:text-4xl md:py-[1.8em] md:w-[7em] lg:w-[7.5em]"
            onClick={updateBtn}
          >{`Actualizar`}</button>
        </div>
      </div>
    </dialog>
  );
};
