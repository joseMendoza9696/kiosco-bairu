import { Icon } from '@iconify/react/dist/iconify.js';
import { NotesProduct } from '../Menu/Productos/NotesProduct';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// import { useEffect } from 'react';

// type Props = {
// };
export const Modal2 = () => {
  const editOrder = useSelector((state: RootState) => state.editarOrdenReducer);
  // console.log('modal2', editOrder);

  // TODO: poner el tipo de moneda en base a "moneda" del perfil activo -> del local storage
  //? CURRENCY
  const perfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
  const currency = perfilLocalStorage.moneda;

  const closeBtn = () => {
    (document.getElementById('checkout2') as HTMLDialogElement).close();
  };
  return (
    <dialog id="checkout2" className="modal modal-bottom">
      <div className="modal-box bg-base-100 rounded-t-[90px] h-[87%] px-24 pt-36">
        {/* button close modal */}
        <form method="dialog" className="absolute top-0 left-[calc(50%-86px)]">
          <button className="btn rounded-t-none rounded-b-3xl h-28 w-48">
            <Icon
              icon="material-symbols-light:close"
              width="48px"
              height="48px"
            />
          </button>
        </form>
        {/* product image */}
        <div className="flex justify-center mb-5">
          <img
            src={editOrder.imagen}
            alt={editOrder.nombre}
            className="w-[400px] h-[400px] rounded-3xl object-cover"
          />
        </div>
        {/* name product and notes */}
        <div className="flex gap-6 justify-center">
          <h2 className="font-bold text-6xl text-center">{editOrder.nombre}</h2>
          <NotesProduct.Modal2></NotesProduct.Modal2>
        </div>
        {/* description */}
        <p className="py-4 text-3xl text-center text-[#A6A6AA]">
          {editOrder.descripcion}
        </p>
        {/* price */}
        <span className="block text-center text-primary text-5xl font-bold mb-5">
          {currency} {editOrder.precioOriginal}
        </span>
        {/* component steps */}
        <div className="bg-[#F2F2F2] p-8 rounded-3xl mb-5">
          <ul className="steps w-full mb-3">
            {/* {editOrder.opcionesMenu.map((option, i) => (
              <li
                key={option.id}
                className={`step step-primary`}
                data-content={'✓'}
              ></li>
            ))} */}
            <li className={`step`} data-content={''}></li>
          </ul>
          <p className="text-2xl font-semibold">
            Paso {`1`} {`temperatura`}:{' '}
            <span className="pl-8 text-primary">
              Seleccione al menos una opción.
            </span>
          </p>
        </div>
        <div>
          {/* OPTIONS PRODUCT */}
          <div className="grid grid-cols-4 justify-items-center gap-3 h-[32.5rem] overflow-y-auto mb-2">
            {/*  PRODUCT ITEMS */}
            {/* {options.map(() => (
              <button
                // border-4 border-primary
                className={`flex flex-col h-[14.4375rem] w-[12.5rem] rounded-md shadow-lg relative overflow-hidden`}
              >
                <img
                  src={`/src/assets/imagepromo.png`}
                  alt="jksdfa"
                  className="w-full h-[10.4375rem] object-cover"
                />
                <div className="p-2">
                  <h2 className="text-lg font-semibold text-left capitalize">{`aguacate`}</h2>
                  <p className="text-left font-semibold text-lg">
                    + {`MXN`} {`56.00`}
                  </p>
                </div>
                {true && (
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <Icon
                      icon="ei:check"
                      className="text-primary w-[2.8125rem] h-[2.8125rem]"
                    />
                  </div>
                )}
              </button>
            ))} */}
          </div>
        </div>
        {/* BUTTONS cancel minus number plus procedd */}
        <div className=" bottom-6 w-full flex justify-between items-center">
          {/* BACK, CANCEL */}
          <button
            className="btn text-5xl w-56 rounded-3xl h-28 font-semibold"
            onClick={closeBtn}
          >{`Cancelar`}</button>
          {/* MINUS */}
          <button className="btn w-36 h-20 rounded-3xl">
            <Icon
              width="48px"
              height="48px"
              icon="icomoon-free:minus"
              className=""
            />
          </button>
          {/* AMOUNT */}
          <span className="text-5xl font-bold">{editOrder.cantidad}</span>
          {/* PLUS */}
          <button className="btn w-36 h-20 rounded-3xl text-white btn-primary">
            <Icon
              width="48px"
              height="48px"
              icon="icomoon-free:plus"
              className=""
            />
          </button>
          {/* ADD, CONTINUE */}
          <button className="btn text-5xl w-56 rounded-3xl h-28 text-white font-semibold btn-primary">{`Siguente`}</button>
        </div>
      </div>
    </dialog>
  );
};
