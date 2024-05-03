// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { useState } from 'react';
import {
  editarCantidadProducto,
  quitarUltimoProducto,
  actualizarCuentaTotal,
} from '../../../redux/actions/nuevaOrden.action.ts';

interface IModal1 {
  closeModal: any;
}

export const Modal1 = ({ closeModal }: IModal1) => {
  const dispatch = useDispatch();

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

  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px]">
          <button
            className="btn btn-square w-24"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(quitarUltimoProducto());

              closeModal();
            }}
          >
            X
          </button>

          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[294px] "
          />
          <p className="font-bold text-center text-[65px] pt-[64px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precioTotal}
          </p>

          <div className="flex justify-center  mt-4 mx-[130px] space-x-[70px]  items-center ">
            <button
              className="btn btn-ghost btn-active w-[156px] h-[93px] text-[90px] font-bold rounded-2xl"
              onClick={() => {
                editarCantidad(-1);
              }}
            >
              -
            </button>
            <span className="text-[40px] font-bold">{cantidad}</span>
            <button
              className="btn pb-2 rounded-2xl btn-primary w-[156px] h-[93px] text-[90px] font-bold "
              onClick={() => {
                editarCantidad(1);
              }}
            >
              +
            </button>
          </div>

          <div className="text-center my-[127px] space-x-[100px] ">
            <button
              className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                dispatch(quitarUltimoProducto());

                closeModal();
              }}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
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
