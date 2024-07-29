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
        <div className="relative modal-box bg-base-100 rounded-t-[5.6rem] md:h-[93%] lg:h-[87%] md:px-10 md:pt-24 lg:px-24 lg:pt-44">
          {/* button close modal */}
          <form method="dialog">
            <button
              className="btn rounded-t-none rounded-b-3xl absolute top-0 md:left-[calc(50%-5rem)] lg:left-[calc(50%-5.375rem)] md:h-20 md:w-40 lg:h-28 lg:w-48 text-5xl"
              onClick={atras}
            >
              <Icon icon="material-symbols-light:close" />
            </button>
          </form>
          {/* product image */}
          <div className=" object-cover md:h-[16rem] lg:h-[25rem] md:mb-4 lg:mb-10">
            <img
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="h-full object-center mx-auto rounded-3xl"
            />
          </div>
          {/* name product and notes */}
          <div className="flex gap-6 justify-center md:items-center md:mb-4 lg:mb-8">
            <h2 className="font-bold md:text-4xl lg:text-6xl text-center">
              {productoSeleccionado.nombre}
            </h2>
            {notasProductos && <NotesProduct.Modal2 getNote={setnoteModal} />}
          </div>
          {/* description */}
          <p className="md:text-xl lg:text-3xl text-center text-[#A6A6AA] md:mb-2 lg:mb-8">
            {productoSeleccionado.descripcion}
          </p>
          {/* price */}
          <span className="block text-center text-primary md:text-4xl lg:text-5xl font-semibold md:mb-4">
            {monedaPerfil}{' '}
            {parseFloat(productoSeleccionado.precioTotal.toString()).toFixed(2)}
          </span>
          {/* component steps */}
          <div className="bg-[#F2F2F2] md:p-4 lg:p-8 rounded-3xl mb-5 text-start">
            <ul className="steps w-full md:mb-3">
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
            <p className="md:text-lg lg:text-2xl">
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
          {/* OPTIONS PRODUCT */}
          <div className="overflow-y-auto scroll-hidden grid md:grid-cols-3 lg:grid-cols-4 justify-items-center md:max-h-[22rem] lg:max-h-[24rem]">
            {/*  PRODUCT ITEMS */}
            {opciones &&
              opciones.map((option: Opcion, i: number) => (
                <button
                  key={option.id}
                  className={` md:w-[13.5rem] lg:w-[12.5rem] rounded-md shadow-lg relative overflow-hidden md:mb-[1rem] ${option.seleccionado ? 'border-4 border-primary' : ''}`}
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
                    className="w-full h-[10.4rem] object-cover object-top"
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
          {/* BUTTONS cancel minus number plus procedd */}
          <div className="md:bottom-8 lg:bottom-9 flex justify-between items-center absolute md:w-[90%] lg:w-[82%]">
            {/* BACK, CANCEL */}
            <button
              className="box-content btn font-semibold md:text-2xl lg:text-4xl rounded-3xl md:py-[1.2em] md:w-[5.5em] lg:py-[1.5em] lg:w-[5.4em]"
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
              className="box-content h-max btn md:py-[0.2em] md:w-[1.5em] md:rounded-2xl lg:rounded-3xl md:text-5xl lg:text-6xl"
              disabled={productoSeleccionado.cantidad <= 1}
            >
              <Icon icon="icomoon-free:minus" />
            </button>
            {/* AMOUNT */}
            <span className="md:text-3xl lg:text-5xl font-bold">
              {cantidad}
            </span>
            {/* PLUS */}
            <button
              className="text-white btn-primary box-content h-max btn md:py-[0.2em] md:w-[1.5em] md:rounded-2xl lg:rounded-3xl md:text-5xl lg:text-6xl"
              onClick={() => editarCantidad(1)}
            >
              <Icon icon="icomoon-free:plus" />
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
              className="box-content text-white btn-primary btn font-semibold md:text-2xl lg:text-4xl rounded-3xl md:py-[1.2em] md:w-[5.5em] lg:py-[1.5em] lg:w-[5.4em]"
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
