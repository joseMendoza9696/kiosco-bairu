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
  modificarCantidadProducto,
  seleccionarOpcionEditar,
  vaciarEditarProductoOrden,
} from '../../redux/actions/editarOrden.action';
import { EditarProductoInterface } from '../../interfaces/editarOrden.interface';

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
      setstepsIndex(0);
    }
  };

  //? CURRENCY
  const perfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
  const currencyLocal = perfilLocalStorage.moneda;
  const storageNotes = perfilLocalStorage.notas_productos;
  return (
    <dialog id="checkout2" className="modal modal-bottom">
      <div className="relative modal-box bg-base-100 rounded-t-[5.6rem] md:h-[93%] lg:h-[87%] md:px-8 md:pt-24 lg:px-20 lg:pt-36">
        {/* button close modal */}
        <form method="dialog">
          <button
            className="btn rounded-t-none rounded-b-3xl absolute top-0 md:left-[calc(50%-5rem)] lg:left-[calc(50%-5.375rem)] md:h-20 md:w-40 lg:h-28 lg:w-48 text-5xl"
            onClick={() => {
              setstepsIndex(0);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(vaciarEditarProductoOrden());
            }}
          >
            <Icon icon="material-symbols-light:close" />
          </button>
        </form>
        {/* product image */}
        <div className="object-cover md:h-[18rem] lg:h-[25rem] md:mb-2 lg:mb-4">
          <img
            src={editOrder.imagen}
            alt={editOrder.nombre}
            className="h-full object-center mx-auto rounded-3xl"
          />
        </div>
        {/* name product and notes */}
        <div className="flex gap-6 justify-center md:items-center md:mb-2 lg:mb-4">
          <h2 className="font-bold md:text-4xl lg:text-6xl text-center">
            {editOrder.nombre}
          </h2>
          {/* falta pasar state prop */}
          {storageNotes && <NotesProduct.Modal2 />}
        </div>
        {/* description */}
        <p className="md:text-xl lg:text-3xl text-center text-[#A6A6AA] md:mb-2 lg:mb-4">
          {editOrder.descripcion}
        </p>
        {/* price */}
        <span className="block text-center text-primary md:text-4xl lg:text-5xl font-semibold md:mb-2 lg:mb-4">
          {currencyLocal}{' '}
          {parseFloat(editOrder.precioTotal.toString()).toFixed(2)}
        </span>
        {/* component steps */}
        <div className="bg-[#F2F2F2] rounded-3xl  text-start md:mb-2 lg:mb-4 md:p-4 lg:p-8 ">
          <ul className="steps w-full md:mb-1 lg:mb-4">
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
          <p className="md:text-lg lg:text-2xl">
            Paso {stepsIndex + 1} {editOrder.opcionesMenu[stepsIndex].nombre}:{' '}
            {!!(isRequired && !optionsSelected) && (
              <span className="pl-8 text-primary">
                Seleccione al menos una opción.
              </span>
            )}
          </p>
        </div>
        {/* OPTIONS PRODUCT */}
        <div
          className={`overflow-y-auto scroll-hidden grid md:grid-cols-3 lg:grid-cols-4 justify-items-center 
            ${
              editOrder.nombre.length > 18 && editOrder.descripcion.length > 140
                ? 'md:max-h-[23rem] lg:max-h-[30rem]'
                : editOrder.nombre.length > 25
                  ? 'md:max-h-[27rem] lg:max-h-[35rem]'
                  : !editOrder.descripcion.length &&
                      editOrder.nombre.length > 21
                    ? 'md:max-h-[28rem] lg:max-h-[34rem]'
                    : !editOrder.descripcion.length
                      ? 'md:max-h-[26rem] lg:max-h-[32rem]'
                      : 'md:max-h-[25rem] lg:max-h-[29rem]'
            }`}
        >
          {/*  PRODUCT ITEMS */}
          {optionsProduct &&
            optionsProduct.map((option: Opcion, i: number) => (
              <button
                key={i}
                // border-4 border-primary
                className={`md:w-[13.5rem] lg:w-[12.5rem] rounded-md shadow-lg relative overflow-hidden md:mb-[1rem] ${option.seleccionado ? 'border-4 border-primary' : ''}`}
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
                  className="w-full h-[10.4rem] object-cover object-top"
                />
                <div className="p-2">
                  <h2 className="text-lg font-semibold text-left capitalize">
                    {option.nombre}
                  </h2>
                  <p className="text-left font-semibold text-lg">
                    + {currencyLocal} {option.precio}
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
        {/* BUTTONS cancel minus number plus procedd */}
        <div className="md:bottom-5 lg:bottom-9 flex justify-between items-center absolute md:w-[90%] lg:w-[85%] bg-base-100">
          {/* BACK, CANCEL */}
          <button
            className="box-content btn font-semibold md:text-2xl lg:text-4xl rounded-3xl md:py-[1.2em] md:w-[5.5em] lg:py-[1.5em] lg:w-[5.4em]"
            onClick={closeBtn}
          >
            {stepsIndex ? 'Atrás' : 'Cerrar'}
          </button>
          {/* MINUS */}
          <button
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(modificarCantidadProducto(-1))
            }
            className="box-content h-max btn md:py-[0.2em] md:w-[1.5em] md:rounded-2xl lg:rounded-3xl md:text-5xl lg:text-6xl"
            disabled={editOrder.cantidad <= 1}
          >
            <Icon icon="icomoon-free:minus" />
          </button>
          {/* AMOUNT */}
          <span className="md:text-3xl lg:text-5xl font-bold">
            {editOrder.cantidad}
          </span>
          {/* PLUS */}
          <button
            className="text-white btn-primary box-content h-max btn md:py-[0.2em] md:w-[1.5em] md:rounded-2xl lg:rounded-3xl md:text-5xl lg:text-6xl"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(modificarCantidadProducto(1))
            }
          >
            <Icon icon="icomoon-free:plus" className="" />
          </button>
          {/* ADD, CONTINUE */}
          <button
            disabled={!!(isRequired && !optionsSelected)}
            className="box-content text-white btn-primary btn font-semibold md:text-2xl lg:text-4xl rounded-3xl md:py-[1.2em] md:w-[5.5em] lg:py-[1.5em] lg:w-[5.4em]"
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
