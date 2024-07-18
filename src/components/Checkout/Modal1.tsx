import { Icon } from '@iconify/react/dist/iconify.js';
import { NotesProduct } from '../Menu/Productos/NotesProduct';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// import { useEffect } from 'react';

// type Props = {
//   content?: ProductoNuevaOrden | null;
// };

export const Modal1 = () => {
  const editOrder = useSelector((state: RootState) => state.editarOrdenReducer);
  // console.log('modal1', infoProduct);

  // TODO: poner el tipo de moneda en base a "moneda" del perfil activo -> del local storage
  //? GET CURRENCY
  const perfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
  const currency = perfilLocalStorage.moneda;

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
          <button className="btn rounded-t-none rounded-b-3xl h-28 w-48">
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
          {currency} {editOrder.precioOriginal}
        </span>
        {/*//! OPTIONS PRODUCT */}
        <div className="flex justify-between items-center w-[45%] mx-auto relative mb-28">
          {/* MINUS */}
          <button className="btn w-36 h-20 rounded-3xl">
            <Icon width="3rem" height="3rem" icon="icomoon-free:minus" />
          </button>
          {/* AMOUNT */}
          <span className="text-5xl font-bold">{editOrder.cantidad}</span>
          {/* PLUS */}
          <button className="btn w-36 h-20 rounded-3xl text-white btn-primary">
            <Icon width="3rem" height="3rem" icon="icomoon-free:plus" />
          </button>
          {true && <NotesProduct></NotesProduct>}
        </div>
        {/* BUTTONS cancel minus number plus procedd */}
        <div className="w-[85%] mx-auto flex justify-between items-center">
          {/* BACK, CANCEL */}
          <button
            className="btn text-5xl w-80 rounded-3xl h-44 font-semibold"
            onClick={closeBtn}
          >{`Cancelar`}</button>
          {/* ADD, CONTINUE */}
          <button className="btn text-5xl w-80 rounded-3xl h-44 text-white font-semibold btn-primary">{`Actualizar`}</button>
        </div>
      </div>
    </dialog>
  );
};
