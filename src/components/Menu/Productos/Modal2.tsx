import { useEffect, useState } from 'react';
// REDUX
import { RootState } from '../../../redux/store.ts';
import { quitarUltimoProducto } from '../../../redux/actions/nuevaOrden.action';
import { editarCantidadProducto } from '../../../redux/actions/nuevaOrden.action.ts';
import { useDispatch, useSelector } from 'react-redux';

interface IModal2 {
  closeModal: any;
}

export const Modal2 = ({ closeModal }: IModal2) => {
  const dispatch = useDispatch();

  // TODO: AL APRETAR SIGUIENTE. PASAR AL SIGUIENTE OPCION MENU Y MOSTRAR SUS OPCIONES DE ESE OPCION MENU
  // CHECK ✅
  // TODO: SOLUCIONAR EL BUG DEL MODAL 2
  // WAIT 🕐
  // TODO: SOLUCIONAR BUG AL MAPEAR LAS OPCIONES MENU
  // CHECK ✅
  // TODO: CUANDO LLEGEMOS A LA ULTIMA POSICION DE OPCION MENU, EL BOTON SIGUIENTE SE CAMBIA A AÑADIR
  // CHECK ✅
  // TODO: CUANDO PASEMOS LA SEGUNDA POSICION DE OPCION MENU, EL BOTON CANCELAR SE CAMVIA A ATRAS
  // CHECK ✅
  // TODO: AL CANCELAR EL MODAL2, CERRAR EL MODAL 2 Y QUITAR ULTIMO PRODUCTO
  // CHECK ✅

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

  const [opcionMenuSeleccionadoIndex, setOpcionMenuSeleccionadoIndex] =
    useState<number>(0);

  // FUNCIONES
  const opcionMenuSiguiente = () => {
    if (
      opcionMenuSeleccionadoIndex <
      productoSeleccionado.opcionesMenu.length - 1
    ) {
      setOpcionMenuSeleccionadoIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    console.log(opcionMenuSeleccionadoIndex);
  }, [opcionMenuSeleccionadoIndex]);

  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box h-[1700px] bg-[base-100]  shadow-lg rounded-3xl">
          <button
            className="btn btn-square w-24"
            onClick={() => {
              // TODO: ejecutar quitarUltimoProducto del action
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
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[100px] "
          />
          <p className="font-bold text-center text-[65px] pt-[20px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precioTotal}
          </p>
          {/*HACEMOS EL MAP DE OPCIONES MENU DEL PRODUCTO SELECCIONADO*/}
          <div>
            <div className="mx-24">
              <div className="p-6 bg-gray-200 rounded-xl">
                <div className="container mx-auto">
                  <div>
                    <ul className="steps">
                      {productoSeleccionado.opcionesMenu.map(
                        (opcionMenu, index) => (
                          <li
                            key={index}
                            className={`step ${index === opcionMenuSeleccionadoIndex ? 'selected' : ''} ${index === opcionMenuSeleccionadoIndex ? 'step-primary' : ''}`}
                            data-content={
                              index === opcionMenuSeleccionadoIndex ? '✓' : ''
                            }
                          >
                            <span
                              className={
                                index === opcionMenuSeleccionadoIndex
                                  ? 'font-bold'
                                  : ''
                              }
                            >
                              {opcionMenu.nombre}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
                <p className="text-left pt-4 font-bold text-2xl"> </p>
              </div>
            </div>
          </div>

          {/*HACEMOS EL MAP DE LAS OPCIONES DE OPCIONES MENU SELECCIONADO*/}
          <div className="flex flex-wrap mx-[56px] py-8  gap-y-8 overflow-auto overflow-y-auto max-h-[500px]">
            {productoSeleccionado.opcionesMenu[
              opcionMenuSeleccionadoIndex
            ].opciones.map((opcion, index) => (
              <div key={index}>
                <div className="flex flex-wrap mx-8   gap-y-8 items-center justify-between ">
                  <button className="flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md">
                    <img
                      src={opcion.imagen}
                      alt={opcion.nombre}
                      className="w-[200px] h-[167px] rounded-xl object-cover"
                    />
                    <div className="ml-2">
                      <h2 className="text-[20px] font-semibold text-left ">
                        {opcion.nombre}
                      </h2>
                      <p className="text-left text-semibold text-lg">
                        {/* Bs. {opcionSeleccionado.precioTotal} */}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mx-16 fixed bottom-8 left-0 right-0">
            <div className="flex items-center justify-between text-center  mx-2">
              <button
                className="  w-[211px] h-[122px] text-[30px] rounded-[20px] btn 
"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  dispatch(quitarUltimoProducto());
                  closeModal();
                }}
              >
                {opcionMenuSeleccionadoIndex !== 0 ? 'Atrás' : 'Cancelar'}
              </button>

              <button
                className=" mx-8 w-[156px] h-[93px] text-[90px] font-bold rounded-2xl btn"
                onClick={() => {
                  editarCantidad(-1);
                }}
              >
                -
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-[40px] font-bold ">{cantidad}</span>
            </div>
            <div className="flex items-center">
              <button
                className=" btn rounded-2xl btn-primary w-[156px] h-[93px] text-[90px] font-bold mx-8"
                onClick={() => {
                  editarCantidad(1);
                }}
              >
                +
              </button>
              <button
                className="btn btn-primary w-[211px] h-[122px] text-[30px] rounded-[20px] mx-8"
                onClick={opcionMenuSiguiente}
              >
                {opcionMenuSeleccionadoIndex ===
                productoSeleccionado.opcionesMenu.length - 1
                  ? 'Añadir'
                  : 'Siguiente'}
              </button>
            </div>
          </div>
          {/* end button section */}
        </div>
      )}
    </>
  );
};
