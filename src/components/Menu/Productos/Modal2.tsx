import { useEffect, useState } from 'react';
// REDUX
import { RootState } from '../../../redux/store.ts';
import {
  actualizarCuentaTotal,
  agregarNotaProducto,
  deseleccionarOpcion,
  quitarUltimoProducto,
  seleccionarOpcion,
} from '../../../redux/actions/nuevaOrden.action';
import { editarCantidadProducto } from '../../../redux/actions/nuevaOrden.action.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react/dist/iconify.js';
import { NotesProduct } from './NotesProduct.tsx';
import {
  Opcion,
  OpcionMenuNuevaOrden,
} from '../../../interfaces/nuevaOrden.interface.ts';

interface IModal2 {
  closeModal: any;
}

export const Modal2 = ({ closeModal }: IModal2) => {
  const [noteModal, setnoteModal] = useState<string>('');
  useEffect(() => {
    if (noteModal) {
      agregarNota(noteModal);
    }
  }, [noteModal]);
  const agregarNota = (nota: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error

    dispatch(agregarNotaProducto(nota, productoSeleccionadoIndex));
  };

  const dispatch = useDispatch();

  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

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
  const notasProductos = PerfilLocalStorage?.notas_productos;
  const monedaPerfil = PerfilLocalStorage?.moneda;

  return (
    <>
      {productoSeleccionado && productoSeleccionado.opcionesMenu.length > 0 && (
        <div className="modal-box bg-base-100 rounded-t-[90px] h-[87%] px-24 pt-36 relative">
          {/* button close modal */}
          <form
            method="dialog"
            className="absolute top-0 left-[calc(50%-96px)]"
          >
            <button
              className="btn rounded-t-none rounded-b-3xl h-28 w-48"
              onClick={atras}
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
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="w-[400px] h-[400px] rounded-3xl object-cover"
            />
          </div>
          {/* name product and notes */}
          <div className="flex gap-6 justify-center items-start">
            <h2 className="font-bold text-6xl text-center">
              {productoSeleccionado.nombre}
            </h2>
            {notasProductos && <NotesProduct.Modal2 getNote={setnoteModal} />}
          </div>
          {/* description */}
          <p className="py-4 text-3xl text-center text-[#A6A6AA]">
            {productoSeleccionado.descripcion}
          </p>
          {/* price */}
          <span className="block text-center text-primary text-4xl font-semibold mb-5">
            {monedaPerfil} {productoSeleccionado.precioTotal}
          </span>
          {/* component steps */}
          <div className="bg-[#F2F2F2] p-8 rounded-3xl mb-5 text-start">
            <ul className="steps w-full mb-3">
              {productoSeleccionado.opcionesMenu.map(
                (_option: OpcionMenuNuevaOrden, i: number) => (
                  <li
                    key={i}
                    className={`step ${i <= opcionMenuSeleccionadoIndex ? 'step-primary' : ''}`}
                    data-content={`${i <= opcionMenuSeleccionadoIndex ? '✓' : ''}`}
                  ></li>
                ),
              )}
            </ul>
            <p className="text-2xl">
              Paso {opcionMenuSeleccionadoIndex + 1}{' '}
              {
                productoSeleccionado.opcionesMenu[opcionMenuSeleccionadoIndex]
                  .nombre
              }
              :{' '}
              {!!(
                opcionMenuSeleccionado?.obligatorio &&
                !opcionMenuSeleccionado.cantidadSeleccionada
              ) && (
                <span className="pl-8 text-primary">
                  Seleccione al menos una opción.
                </span>
              )}
            </p>
          </div>
          {/* pasos(maqueta antigua) */}
          {/* <div className="mx-auto ">
            <div className="p-6 bg-[#F2F2F2] rounded-xl overflow-x-auto">
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
          </div> */}
          {/* OPTIONS PRODUCT */}
          <div className="grid grid-cols-4 justify-items-center gap-3 h-[35rem] overflow-y-auto mb-2">
            {/*  PRODUCT ITEMS */}
            {opciones &&
              opciones.map((option: Opcion, i: number) => (
                <button
                  key={option.id}
                  className={`flex flex-col h-[15rem] w-[12.5rem] rounded-md shadow-lg relative overflow-hidden ${option.seleccionado ? 'border-4 border-primary' : ''}`}
                  onClick={() => {
                    if (option.seleccionado) {
                      deseleccionarOpcionFunc(opcionMenuSeleccionadoIndex, i);
                    } else {
                      seleccionarOpcionFunc(opcionMenuSeleccionadoIndex, i);
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
                      + {monedaPerfil} {option.precio}
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
          {/* las opciones (antigua maqueta) */}
          {/* <div className="flex flex-wrap py-8 gap-y-8 overflow-auto max-h-[500px] justify-center mt-4 scroll-hidden">
            {opciones &&
              opciones.map((opcion, index) => (
                <div key={opcion.id} className="relative mx-4">
                  <button
                    className={`flex flex-col h-[231px] w-[200px] rounded-md shadow-md relative overflow-hidden ${opcion.seleccionado ? 'border-4 border-primary' : ''}`}
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
                        + {monedaPerfil} {opcion.precio}
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
          </div> */}
          {/* BUTTONS cancel minus number plus procedd */}
          <div className="bottom-9 flex justify-between items-center absolute w-[55.3125rem]">
            {/* BACK, CANCEL */}
            <button
              className="btn text-4xl w-56 rounded-3xl h-28 font-semibold"
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
              {opcionMenuSeleccionadoIndex ? 'Atrás' : 'Cancelar'}
            </button>
            {/* MINUS */}
            <button
              onClick={() => editarCantidad(-1)}
              className="btn w-36 h-20 rounded-3xl"
              disabled={productoSeleccionado.cantidad <= 1}
            >
              <Icon
                width="48px"
                height="48px"
                icon="icomoon-free:minus"
                className=""
              />
            </button>
            {/* AMOUNT */}
            <span className="text-5xl font-bold">{cantidad}</span>
            {/* PLUS */}
            <button
              className="btn w-36 h-20 rounded-3xl text-white btn-primary"
              onClick={() => editarCantidad(1)}
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
              disabled={
                opcionMenuSeleccionado &&
                !!(
                  opcionMenuSeleccionado?.obligatorio &&
                  opcionMenuSeleccionado.cantidadSeleccionada < 1
                )
              }
              className="btn text-4xl w-56 rounded-3xl h-28 text-white font-semibold btn-primary"
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
                : 'Siguente'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
