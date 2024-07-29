import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import {
  actualizarTipoEntrega,
  eliminarProducto,
  editarCantidadProducto,
  actualizarCuentaTotal,
} from '../../redux/actions/nuevaOrden.action.ts';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal2 } from './Modal2.tsx';
import { Modal1 } from './Modal1.tsx';
// EDIT PRODUCT
import { ProductoNuevaOrden } from '../../interfaces/nuevaOrden.interface.ts';
import { editarProductoOrden } from '../../redux/actions/editarOrden.action.ts';

export const Checkout = () => {
  const getOrderEdit = useSelector(
    (state: RootState) => state.editarOrdenReducer,
  );

  // check if getorderEdit it contains
  useEffect(() => {
    if (getOrderEdit.id) {
      // openModal
      (
        document.getElementById(
          `${getOrderEdit.opcionesMenu.length < 1 ? 'checkout1' : 'checkout2'}`,
        ) as HTMLDialogElement
      ).showModal();
    }
  }, [getOrderEdit.id, getOrderEdit]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //? send product to edit
  const editProduct = (product: ProductoNuevaOrden, index: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(editarProductoOrden(product, index));
  };

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);

  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );
  const categoriaActual = useSelector(
    (state: RootState) => state.menuReducer.categorias[categoriaSeleccionada],
  );

  const [tipoEntrega, setTipoEntrega] = useState<string>(
    nuevaOrden.tipoEntrega,
  );

  const cambioTipoEntrega = (nuevoTipoEntrega: string) => {
    setTipoEntrega(nuevoTipoEntrega);
    // @ts-expect-error need to fix this
    dispatch(actualizarTipoEntrega(nuevoTipoEntrega));
  };

  const editarCantidad = (index: number, incremento: number) => {
    // @ts-expect-error need to fix this
    dispatch(editarCantidadProducto(index, incremento));
    // @ts-expect-error need to fix this
    dispatch(actualizarCuentaTotal());
  };

  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const monedaPerfil = PerfilLocalStorage?.moneda;

  // console.log(nuevaOrden.productos[0]?.cantidad);

  return (
    <div className="md:px-7 lg:px-16">
      {/* MODALS ============================= if truthy/falsy */}
      {!!(getOrderEdit.id && !getOrderEdit.opcionesMenu.length) && <Modal1 />}
      {!!(getOrderEdit.id && getOrderEdit.opcionesMenu.length) && <Modal2 />}
      <h1 className="text-center text-primary font-bold md:text-5xl lg:text-6xl md:mt-14 md:mb-10 lg:mt-28 lg:mb-14">
        TU ORDEN
      </h1>
      {/* BUTTON para aqui / para llevar */}
      <div className="bg-primary flex items-center justify-between cursor-pointer md:mx-[5em] lg:mx-auto md:mb-5 lg:mb-8 md:rounded-xl lg:rounded-2xl md:py-[0.4em] md:px-[0.5em] ">
        <button
          className={`rounded-2xl w-1/2 font-semibold text-center md:text-3xl lg:text-4xl md:py-[0.4em] gap-2 ${
            tipoEntrega === 'AQUI'
              ? 'bg-white text-primary'
              : 'bg-primary text-white'
          }`}
          onClick={() => cambioTipoEntrega('AQUI')}
        >
          Comer Aquí
        </button>
        <button
          className={`rounded-2xl w-1/2 font-semibold text-center md:text-3xl lg:text-4xl md:py-[0.4em] gap-2 ${
            tipoEntrega === 'LLEVAR'
              ? 'bg-white text-primary'
              : 'bg-primary text-white'
          }`}
          onClick={() => cambioTipoEntrega('LLEVAR')}
        >
          Para llevar
        </button>
      </div>
      <div className="text-right md:mb-4 lg:mb-8">
        <button
          className="btn btn-lg font-bold bg-[#FFD4DE] text-[#FF0816] md:text-2xl lg:text-3xl md:rounded-2xl lg:rounded-xl"
          onClick={() => {
            navigate('/', { replace: true });
            window.location.reload();
          }}
        >
          Vaciar canasta
        </button>
      </div>
      <div className="flex flex-col md:max-h-[50vh] overflow-y-auto lg:max-h-[52vh] scroll-hidden">
        {categoriaActual &&
          nuevaOrden.productos.map((producto, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white shadow-xl md:py-5 md:px-4 md:mx-2 md:mb-6"
            >
              <div className="flex justify-between">
                <div className="flex gap-x-2">
                  <div className="h-32 w-32">
                    <img
                      src={producto.imagen}
                      className="rounded-2xl h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 overflow-hidden">
                    <h2 className="font-semibold md:text-2xl lg:text-4xl">
                      {producto.nombre}
                    </h2>
                    <p className="md:text-xl lg:text-2xl text-primary">
                      {producto.subcategoriaNombre}
                    </p>
                    {/* BUTTON MODIFICAR */}
                    <button
                      className="box-content btn btn-outline rounded-3xl md:text-2xl lg:text-3xl md:py-[0.1em] md:px-[1em] max-w-min"
                      onClick={() => {
                        editProduct(producto, index);
                      }}
                    >
                      Modificar
                    </button>
                  </div>
                </div>
                {/* botones */}
                <div className="flex flex-col justify-between items-end">
                  <p className="font-medium md:text-3xl lg:text-4xl">
                    {monedaPerfil}{' '}
                    {parseFloat(producto.precioTotal.toString()).toFixed(2)}
                  </p>
                  <div className="md:text-6xl flex md:gap-4 lg:gap-7">
                    <button
                      className=""
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        dispatch(eliminarProducto(index));
                        if (nuevaOrden.productos.length === 0) {
                          navigate('/menu');
                        }
                      }}
                    >
                      <Icon icon="iconamoon:trash-duotone" />
                    </button>
                    <button
                      onClick={() => {
                        editarCantidad(index, -1);
                      }}
                    >
                      <Icon icon="zondicons:minus-outline" />
                    </button>
                    <button className="md:text-3xl">{producto.cantidad}</button>
                    <button
                      onClick={() => {
                        editarCantidad(index, 1);
                      }}
                    >
                      <Icon icon="zondicons:add-outline" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* SECCION DE TOTAL */}
      {/* SECCION DE BOTONES */}
      <div className="fixed left-0 w-screen md:bottom-16 lg:bottom-28 md:text-5xl lg:text-6xl">
        <h1 className="text-center text-primary font-bold md:mb-10 lg:mb-14">
          Total {monedaPerfil}{' '}
          {parseFloat(nuevaOrden.cuentaTotal.toString()).toFixed(2)}
        </h1>
        <div className="text-center flex justify-evenly">
          <Link to="/menu">
            <button className="box-content btn md:py-[1.5em] md:w-[6.5em] md:text-3xl lg:text-5xl md:rounded-3xl ">
              Volver
            </button>
          </Link>
          <Link to="/payment">
            <button className="box-content btn text-white btn-primary md:py-[1.5em] md:w-[6.5em] md:text-3xl lg:text-5xl md:rounded-3xl">
              Ir a pagar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
