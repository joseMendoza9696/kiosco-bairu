import { Icon } from '@iconify/react/dist/iconify.js';
import { NotesProduct } from '../Menu/Productos/NotesProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import {
  Opcion,
  OpcionMenuNuevaOrden,
} from '../../interfaces/nuevaOrden.interface';
import {
  deseleccionarOpcionEditar,
  restarCantidadProductoEditar,
  seleccionarOpcionEditar,
  sumarCantidadProductoEditar,
  vaciarEditarProductoOrden,
} from '../../redux/actions/editarOrden.action';
import { EditarProductoInterface } from '../../interfaces/editarOrden.interface';
// import { useEffect } from 'react';

// type Props = {
// };
export const Modal2 = () => {
  //!control steps
  const [stepsIndex, setstepsIndex] = useState<number>(0);
  const dispatch = useDispatch();

  //! get order to edit
  const editOrder: EditarProductoInterface = useSelector(
    (state: RootState) => state.editarOrdenReducer,
  );

  //? get options product
  const optionsProduct = useSelector((state: RootState) => {
    return state.editarOrdenReducer.opcionesMenu[stepsIndex]?.opciones;
  });

  //? OPCIONES REQUERIDAS
  const isRequired = editOrder?.opcionesMenu[stepsIndex].obligatorio;
  //? limit selection | count options selected
  const limitOptions = editOrder?.opcionesMenu[stepsIndex].cantidadSeleccion;
  const optionsSelected =
    editOrder?.opcionesMenu[stepsIndex].cantidadSeleccionada;

  //? select/deselect product functions
  const selectProduct = (menuIndex: number, optionIndex: number) => {
    if (optionsSelected < limitOptions) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(seleccionarOpcionEditar(menuIndex, optionIndex));
    }
  };
  const deselectProduct = (menuIndex: number, optionIndex: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(deseleccionarOpcionEditar(menuIndex, optionIndex));
  };

  //? ADD/NEXT BUTTON
  const addBtn = () => {
    if (stepsIndex === editOrder.opcionesMenu.length - 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(vaciarEditarProductoOrden());
    } else {
      setstepsIndex((i) => i + 1);
    }
  };
  //? BACK/CANCEL BUTTON
  const closeBtn = () => {
    if (stepsIndex) {
      setstepsIndex(stepsIndex - 1);
    } else {
      (document.getElementById('checkout2') as HTMLDialogElement).close();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(vaciarEditarProductoOrden());
    }
  };

  //? CURRENCY

  const perfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
  const currency = perfilLocalStorage.moneda;
  return (
    <dialog id="checkout2" className="modal modal-bottom">
      <div className="modal-box bg-base-100 rounded-t-[90px] h-[87%] px-24 pt-36">
        {/* button close modal */}
        <form method="dialog" className="absolute top-0 left-[calc(50%-86px)]">
          <button
            className="btn rounded-t-none rounded-b-3xl h-28 w-48"
            onClick={() => setstepsIndex(0)}
          >
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
            {editOrder.opcionesMenu.map(
              (_option: OpcionMenuNuevaOrden, i: number) => (
                <li
                  key={i}
                  className={`step ${i <= stepsIndex ? 'step-primary' : ''}`}
                  data-content={`${i <= stepsIndex ? '✓' : ''}`}
                ></li>
              ),
            )}
          </ul>
          <p className="text-2xl font-semibold">
            Paso {stepsIndex + 1} {editOrder.opcionesMenu[stepsIndex].nombre}:{' '}
            {!!(isRequired && !optionsSelected) && (
              <span className="pl-8 text-primary">
                Seleccione al menos una opción.
              </span>
            )}
          </p>
        </div>
        <div>
          {/* OPTIONS PRODUCT */}
          <div className="grid grid-cols-4 justify-items-center gap-3 h-[32.5rem] overflow-y-auto mb-2">
            {/*  PRODUCT ITEMS */}
            {optionsProduct &&
              optionsProduct.map((option: Opcion, i: number) => (
                <button
                  key={i}
                  // border-4 border-primary
                  className={`flex flex-col h-[15rem] w-[12.5rem] rounded-md shadow-lg relative overflow-hidden ${option.seleccionado ? 'border-4 border-primary' : ''}`}
                  onClick={() => {
                    if (option.seleccionado) {
                      deselectProduct(stepsIndex, i);
                    } else {
                      selectProduct(stepsIndex, i);
                    }
                  }}
                >
                  <img
                    src={option.imagen}
                    alt={option.nombre}
                    className="w-full h-[10.4375rem] object-cover"
                  />
                  <div className="p-2">
                    <h2 className="text-lg font-semibold text-left capitalize">
                      {option.nombre}
                    </h2>
                    <p className="text-left font-semibold text-lg">
                      + {currency} {option.precio}
                    </p>
                  </div>
                  {option.seleccionado && (
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                      <Icon
                        icon="ei:check"
                        className="text-primary w-[2.8125rem] h-[2.8125rem]"
                      />
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
        {/* BUTTONS cancel minus number plus procedd */}
        <div className=" bottom-6 w-full flex justify-between items-center">
          {/* BACK, CANCEL */}
          <button
            className="btn text-5xl w-56 rounded-3xl h-28 font-semibold"
            onClick={closeBtn}
          >
            {stepsIndex ? 'Atrás' : 'Cerrar'}
          </button>
          {/* MINUS */}
          {/*//!EDITAR AQUI */}
          <button
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(restarCantidadProductoEditar())
            }
            className="btn w-36 h-20 rounded-3xl"
            disabled={editOrder.cantidad <= 1}
          >
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
          {/*//!EDITAR AQUI */}
          <button
            className="btn w-36 h-20 rounded-3xl text-white btn-primary"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(sumarCantidadProductoEditar())
            }
          >
            <Icon
              width="48px"
              height="48px"
              icon="icomoon-free:plus"
              className=""
            />
          </button>
          {/* ADD, CONTINUE */}
          <button
            disabled={!!(isRequired && !optionsSelected)}
            className="btn text-5xl w-56 rounded-3xl h-28 text-white font-semibold btn-primary"
            onClick={addBtn}
          >
            {stepsIndex === editOrder.opcionesMenu.length - 1
              ? 'Actualizar'
              : 'Siguente'}
          </button>
        </div>
      </div>
    </dialog>
  );
};
