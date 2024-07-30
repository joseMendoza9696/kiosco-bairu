// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { useState } from 'react';
import {
  editarCantidadProducto,
  quitarUltimoProducto,
  actualizarCuentaTotal,
} from '../../../redux/actions/nuevaOrden.action.ts';
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
  // const notasProductos = PerfilLocalStorage?.notas_productos;

  const monedaPerfil = PerfilLocalStorage?.moneda;

  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box bg-base-100 rounded-t-[5.625rem] md:h-[92%] lg:h-[87%] md:px-10 md:pt-24 lg:px-24 lg:pt-44">
          {/* button close modal */}
          <form method="dialog">
            <button
              className="btn rounded-t-none rounded-b-3xl absolute top-0 md:left-[calc(50%-5rem)] lg:left-[calc(50%-5.375rem)] md:h-20 md:w-40 lg:h-28 lg:w-48 text-5xl"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(quitarUltimoProducto());
                setCantidad(1);
                closeModal();
                // setnoteModal('');
              }}
            >
              <Icon icon="material-symbols-light:close" />
            </button>
          </form>
          {/* product image */}
          <div className=" object-cover md:h-[26rem] lg:h-[25rem] md:mb-4 lg:mb-10">
            <img
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="h-full overflow-hidden object-center mx-auto rounded-3xl"
            />
          </div>
          {/* name product */}
          <h2 className="font-bold md:text-5xl lg:text-7xl text-center md:mb-4 lg:mb-8">
            {productoSeleccionado.nombre}
          </h2>
          {/* description */}
          {productoSeleccionado.descripcion && (
            <p className="md:text-2xl lg:text-3xl text-center text-[#A6A6AA] md:mb-4 lg:mb-8">
              {productoSeleccionado.descripcion}
            </p>
          )}
          {/* price */}
          <span className="block text-center md:text-4xl lg:text-5xl  font-bold md:mb-8 lg:mb-16 text-primary">
            {monedaPerfil}{' '}
            {parseFloat(productoSeleccionado.precioTotal.toString()).toFixed(2)}
          </span>
          {/*//! OPTIONS PRODUCT */}
          <div className="flex justify-between items-center w-[55%] mx-auto relative md:mb-14 lg:mb-28">
            {/* MINUS */}
            <button
              disabled={cantidad <= 1}
              className="btn h-max box-content flex justify-center md:py-[0.3em] md:px-[1em] lg:py-[0.4em] md:text-5xl lg:text-6xl rounded-3xl"
              onClick={() => {
                editarCantidad(-1);
              }}
            >
              <Icon icon="icomoon-free:minus" />
            </button>
            {/* AMOUNT */}
            <span className="text-5xl font-bold">{cantidad}</span>
            {/* PLUS */}
            <button
              className="btn h-max box-content flex justify-center md:py-[0.3em] md:px-[1em] lg:py-[0.4em] md:text-5xl lg:text-6xl rounded-3xl text-white btn-primary"
              onClick={() => {
                editarCantidad(1);
              }}
            >
              <Icon icon="icomoon-free:plus" />
            </button>

            {/* {notasProductos && (
              <button
                className="absolute md:-right-28 lg:-right-32"
                onClick={() => {
                  (
                    document.getElementById(
                      'my_modal_notes1',
                    ) as HTMLDialogElement
                  ).showModal();
                  setnoteModal('');
                }}
              >
                <Icon
                  icon="akar-icons:edit"
                  className="md:text-7xl lg:text-8xl"
                />
              </button>
            )}
            <dialog id="my_modal_notes1" className="modal">
              <div className="modal-box  rounded-3xl flex flex-col items-center gap-12 w-[70%]">
                <h3 className="font-bold md:text-4xl lg:text-5xl mt-10">
                  Notas adicionales
                </h3>
                <input
                  type="text"
                  onChange={(e) => setnoteModal(e.target.value)}
                  value={noteModal}
                  placeholder="Nota..."
                  className="input input-bordered w-full max-w-md border-4 p-9 md:text-3xl lg:text-4xl"
                />
                <button
                  className="btn bg-primary text-4xl btn-lg btn-wide"
                  onClick={() => {
                    (
                      document.getElementById(
                        'my_modal_notes1',
                      ) as HTMLDialogElement
                    ).close();
                  }}
                >
                  Añadir
                </button>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button onClick={() => setnoteModal('')}></button>
              </form>
            </dialog> */}
          </div>
          {/* BUTTONS: cancel minus amount plus add */}
          <div className="mx-auto flex justify-between items-center md:w-[83%] lg:w-[85%]">
            {/* CANCEL */}
            <button
              className="btn box-content font-semibold rounded-3xl md:text-3xl lg:text-4xl md:py-[1.8em] md:w-[7em] lg:w-[7.5em]"
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
              className="btn box-content text-white font-semibold rounded-3xl btn-primary md:text-3xl lg:text-4xl md:py-[1.8em] md:w-[7em] lg:w-[7.5em]"
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
