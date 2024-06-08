import { useState } from 'react';
// REDUX
import { RootState } from '../../../redux/store.ts';
import {
  actualizarCuentaTotal,
  deseleccionarOpcion,
  quitarUltimoProducto,
  seleccionarOpcion,
} from '../../../redux/actions/nuevaOrden.action';
import { editarCantidadProducto } from '../../../redux/actions/nuevaOrden.action.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react/dist/iconify.js';

interface IModal2 {
  closeModal: any;
}

export const Modal2 = ({ closeModal }: IModal2) => {
  const dispatch = useDispatch();

  // ESTADOS DE REACT
  const [cantidad, setCantidad] = useState<number>(1);
  const [opcionMenuSeleccionadoIndex, setOpcionMenuSeleccionadoIndex] =
    useState<number>(0);

  // FUNCIONES DE REDUX

  // Funcion para quitar el ultimo producto
  const productoSeleccionadoIndex =
    useSelector((state: RootState) => state.nuevaOrdenReducer.productos)
      .length - 1;

  const productoSeleccionado = useSelector(
    (state: RootState) =>
      state.nuevaOrdenReducer.productos[
        state.nuevaOrdenReducer.productos.length - 1
      ],
  );

  // Funcion para editar la cantidad del producto
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

  const opcionMenuSeleccionado =
    productoSeleccionado && productoSeleccionado.opcionesMenu
      ? productoSeleccionado.opcionesMenu[opcionMenuSeleccionadoIndex]
      : undefined;

  const cantidadSeleccionadaOpcionMenu = useSelector((state: RootState) => {
    const producto =
      state.nuevaOrdenReducer.productos[productoSeleccionadoIndex];
    return producto &&
      producto.opcionesMenu &&
      producto.opcionesMenu[opcionMenuSeleccionadoIndex]
      ? producto.opcionesMenu[opcionMenuSeleccionadoIndex].cantidadSeleccionada
      : undefined;
  });

  const opciones = useSelector((state: RootState) => {
    const producto =
      state.nuevaOrdenReducer.productos[productoSeleccionadoIndex];
    return producto &&
      producto.opcionesMenu &&
      producto.opcionesMenu[opcionMenuSeleccionadoIndex]
      ? producto.opcionesMenu[opcionMenuSeleccionadoIndex].opciones
      : undefined;
  });

  // FUNCIONES
  const opcionMenuSiguiente = () => {
    if (
      opcionMenuSeleccionadoIndex <
      productoSeleccionado.opcionesMenu.length - 1
    ) {
      setOpcionMenuSeleccionadoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const seleccionarOpcionFunc = (
    indexOpcionMenu: number,
    indexOpcion: number,
  ) => {
    if (
      typeof cantidadSeleccionadaOpcionMenu === 'number' &&
      typeof cantidadMaximaSeleccion === 'number'
    ) {
      if (cantidadSeleccionadaOpcionMenu < cantidadMaximaSeleccion) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(seleccionarOpcion(indexOpcionMenu, indexOpcion));
      }
    }
  };

  const deseleccionarOpcionFunc = (
    indexOpcionMenu: number,
    indexOpcion: number,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(deseleccionarOpcion(indexOpcionMenu, indexOpcion));
  };

  const cantidadMaximaSeleccion =
    opcionMenuSeleccionado && opcionMenuSeleccionado.cantidadSeleccion;

  const agregarProductoACanasta = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(actualizarCuentaTotal());
    setCantidad(1);
    setOpcionMenuSeleccionadoIndex(0);
    closeModal();
  };

  const atras = () => {
    closeModal();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(quitarUltimoProducto());
    setCantidad(1);
    setOpcionMenuSeleccionadoIndex(0);
  };

  return (
    <>
      {productoSeleccionado && productoSeleccionado.opcionesMenu.length > 0 && (
        <div className="modal-box h-[1700px] bg-[base-100]  shadow-lg rounded-t-[90px] ">
          <button className="btn btn-square w-24 " onClick={atras}>
            X
          </button>
          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="w-[390px] h-[390px] rounded-[30px] object-cover mx-auto mt-[50px] "
          />
          <p className="font-bold text-center text-[65px] pt-[10px]">
            {productoSeleccionado.nombre}
          </p>
          <div className="px-32 py-4 font-semibold text-secondary text-center text-[30px]">
            {productoSeleccionado.descripcion}
          </div>

          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precioTotal}
          </p>
          <div className="mx-auto">
            <div className="p-6 bg-accent rounded-xl overflow-x-auto">
              <div className="container ">
                <ul
                  className={`steps grid grid-cols-${productoSeleccionado.opcionesMenu.length} ${productoSeleccionado.opcionesMenu.length === 1 ? 'justify-center' : ''}`}
                >
                  {productoSeleccionado.opcionesMenu.map(
                    (_opcionMenu, index) => (
                      <li
                        key={index}
                        className={`step   ${index === opcionMenuSeleccionadoIndex ? 'selected' : ''} ${index === opcionMenuSeleccionadoIndex ? 'step-primary' : ''}`}
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
                          ></span>
                        )}
                      </li>
                    ),
                  )}
                </ul>

                <div className="text-left pt-4 font-bold text-2xl flex ">
                  Paso {opcionMenuSeleccionadoIndex + 1} :
                  {
                    productoSeleccionado.opcionesMenu[
                      opcionMenuSeleccionadoIndex
                    ].nombre
                  }
                  {opcionMenuSeleccionado &&
                    opcionMenuSeleccionado.obligatorio &&
                    opcionMenuSeleccionado.cantidadSeleccionada < 1 && (
                      <p className="text-primary text-2xl font-bold pl-16">
                        Seleccione al menos una opción.
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap py-8 gap-y-8 overflow-auto max-h-[500px] justify-center mt-4 scroll-hidden">
            {opciones &&
              opciones.map((opcion, index) => (
                <div key={opcion.id} className="relative mx-4">
                  <button
                    className={`flex flex-col h-[231px] w-[200px] rounded-md shadow-md relative overflow-hidden ${opcion.seleccionado ? 'border-8 border-primary' : ''}`}
                    onClick={() => {
                      if (opcion.seleccionado) {
                        deseleccionarOpcionFunc(
                          opcionMenuSeleccionadoIndex,
                          index,
                        );
                      } else {
                        seleccionarOpcionFunc(
                          opcionMenuSeleccionadoIndex,
                          index,
                        );
                      }
                    }}
                  >
                    <img
                      src={opcion.imagen}
                      alt={opcion.nombre}
                      className="w-full h-[167px] rounded-t-md object-cover"
                    />
                    <div className="p-2">
                      <h2 className="text-[16px] font-semibold text-left truncate">
                        {opcion.nombre}
                      </h2>
                      <p className="text-left font-semibold text-lg">
                        +Bs. {opcion.precio}
                      </p>
                    </div>
                    {opcion.seleccionado && (
                      <div className="absolute top-0 right-0 mt-2 mr-2">
                        <Icon
                          icon="ei:check"
                          className="text-primary w-[45px] h-[45px]"
                        />
                      </div>
                    )}
                  </button>
                </div>
              ))}
          </div>

          {/* BOTONES DE ANADIR ELIMINAR Y CANCELAR */}
          <div className="flex justify-between mx-16 fixed bottom-8 left-0 right-0">
            <div className="flex items-center justify-between text-center  mx-2">
              <button
                className="w-[211px] h-[122px] text-[30px] rounded-[20px] btn"
                // Remover la lógica de deshabilitación
                onClick={() => {
                  if (opcionMenuSeleccionadoIndex > 0) {
                    setOpcionMenuSeleccionadoIndex(
                      opcionMenuSeleccionadoIndex - 1,
                    );
                  } else {
                    atras();
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
                disabled={
                  opcionMenuSeleccionado &&
                  !!(
                    opcionMenuSeleccionado.obligatorio &&
                    opcionMenuSeleccionado.cantidadSeleccionada < 1
                  )
                }
                className="btn btn-primary w-[211px] h-[122px] text-[30px] rounded-[20px] mx-8"
                onClick={() => {
                  if (
                    opcionMenuSeleccionadoIndex ===
                    productoSeleccionado.opcionesMenu.length - 1
                  ) {
                    agregarProductoACanasta();
                  } else {
                    opcionMenuSiguiente();
                  }
                }}
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
