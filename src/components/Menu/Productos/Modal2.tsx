import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { quitarUltimoProducto } from '../../../redux/actions/nuevaOrden.action';

interface IModal2 {
  closeModal: any;
}

export const Modal2 = ({ closeModal }: IModal2) => {
  const dispatch = useDispatch();
  // ESTADOS DE REACT
  // const [cantidad, setCantidad] = useState<number>(1);
  // const [opcionMenuSeleccionadoIndex, setOpcionMenuSeleccionadoIndex] =
  // useState<number>(0);

  const productoSeleccionadoIndex = useSelector(
    (state: RootState) => state.nuevaOrdenReducer.productos.length - 1,
  );

  const productoSeleccionado = useSelector(
    (state: RootState) =>
      state.nuevaOrdenReducer.productos[
        state.nuevaOrdenReducer.productos.length - 1
      ],
  );

  return (
    <>
      {productoSeleccionado &&
      productoSeleccionado.opcionesMenu !== undefined ? (
        <div className="modal-box h-[1700px] bg-[base-100]  shadow-lg rounded-t-[90px] ">
          <button
            className="btn btn-square w-24"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(quitarUltimoProducto());
              closeModal();
            }}
          >
            no null
          </button>
          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[50px] "
          />
          <p className="font-bold text-center text-[65px] pt-[20px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precioTotal}
          </p>
          {/*HACEMOS EL MAP DE OPCIONES MENU DEL PRODUCTO SELECCIONADO*/}
        </div>
      ) : null}
    </>
  );
};
