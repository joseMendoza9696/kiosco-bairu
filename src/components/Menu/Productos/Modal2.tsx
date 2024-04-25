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
  // TODO: SOLUCIONAR EL BUG DEL MODAL 2
  // WAIT 🕐
  // TODO: EL BOTON DE "ATRAS", SELECCIONA LA OPCION MENU ANTERIOR
  // CHECK ✅
  // TODO: EN OPCIONES MENU, SOLO MOSTRAR EL TITULO DE LA OPCION MENU, "NO MOSTRAR LOS OTROS PASOS" VER UI FIGMA
  // CHECK 50% ✅
  // TODO: CUANDO SE PRESIONA AÑADIR, SOLO CERRAR EL MODAL
  // CHECK 50% ✅
  // TODO: SUBIR LA IMAGEN DEL PRODUCTO HASTA UN POCO ABAJO DE LA "X"
  // CHECK ✅
  // TODO: NO utilizar colores por defecto, utilizar del tema.
  // CHECK ✅
  // TODO: SI OPCION MENU ESTA SELECCIONADO, RESALTARLO COMO EN EL FIGMA
  // TODO: (REDUX) EN LA FUNCION SELECCIONAR_OPCION_FUNC(), UTILIZAR EL ACTION SELECCIONAR_OPCION DE REDUX.

  // TODO: SEGUN LA PROPIEDAD OBLIGATORIO DE OPCION_MENU, NO DEBERIA DEJARTE PASAR AL SIGUIENTE OPCION MENU

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

  const seleccionarOpcionFunc = () => {};

  useEffect(() => {
    console.log(opcionMenuSeleccionadoIndex);
  }, [opcionMenuSeleccionadoIndex]);

  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box h-[1700px] bg-[base-100]  shadow-lg rounded-3xl ">
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
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[60px] "
          />
          <p className="font-bold text-center text-[65px] pt-[20px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precioTotal}
          </p>
          {/*HACEMOS EL MAP DE OPCIONES MENU DEL PRODUCTO SELECCIONADO*/}

          <div className="mx-24">
            <div className="p-6 bg-accent rounded-xl overflow-x-auto">
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
                          {index === opcionMenuSeleccionadoIndex && (
                            <span
                              className={
                                index === opcionMenuSeleccionadoIndex
                                  ? 'font-bold'
                                  : ''
                              }
                            >
                              {opcionMenu.nombre}
                            </span>
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
              <p className="text-left pt-4 font-bold text-2xl"> </p>
            </div>
          </div>

          {/*HACEMOS EL MAP DE LAS OPCIONES */}
          <div className="flex flex-wrap mx-[56px] py-8  gap-y-8 overflow-auto overflow-y-auto max-h-[500px]">
            {productoSeleccionado.opcionesMenu[
              opcionMenuSeleccionadoIndex
            ].opciones.map((opcion) => (
              <div key={opcion.id}>
                <div className="flex flex-wrap mx-8   gap-y-8 items-center justify-between ">
                  <button
                    className={`flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md ${opcionMenuSeleccionadoIndex !== 0 ? '  focus:outline-none focus:ring focus:ring-primary' : ''}`}
                    onClick={seleccionarOpcionFunc}
                  >
                    <img
                      src={opcion.imagen}
                      alt={opcion.nombre}
                      className="w-[200px] h-[167px] rounded-xl object-cover"
                    />
                    <div className="ml-2">
                      <h2 className="text-[20px] font-semibold text-left ">
                        {opcion.nombre}
                        {/*{opcion.seleccionado === true}*/}
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
                  if (opcionMenuSeleccionadoIndex > 0) {
                    setOpcionMenuSeleccionadoIndex(
                      opcionMenuSeleccionadoIndex - 1,
                    );
                  } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    dispatch(quitarUltimoProducto());
                    closeModal();
                  }
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
