import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import {
  actualizarTipoEntrega,
  eliminarProducto,
  editarCantidadProducto,
  actualizarCuentaTotal,
} from '../../redux/actions/nuevaOrden.action.ts';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react/dist/iconify.js';
// import { Modal1 } from './Modal1.tsx';
// import { Modal2 } from './Modal2.tsx';

export const Checkout = () => {
  // TODO: "comer aqui" y "para llevar" son botones diferentes.
  // TODO: dar mejor estilo al boton de "modificar"
  // TODO: 2. crear modals 1 y 2 en la carpeta checkout. Cuando la gente haga click en modificar se abrir el modal correspondiente

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  // const categorias = useSelector(
  //   (state: RootState) => state.menuReducer.categorias,
  // );

  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );
  const categoriaActual = useSelector(
    (state: RootState) => state.menuReducer.categorias[categoriaSeleccionada],
  );
  // const subcategoriaSeleccionada = useSelector(
  //   (state: RootState) => state.menuSeleccionReducer.subcategoriaSeleccionada,
  // );

  const [tipoEntrega, setTipoEntrega] = useState<string>(
    nuevaOrden.tipoEntrega,
  );
  // const [modal2, setModal2] = useState<boolean>(false);

  const cambioTipoEntrega = (tipoEntrega: string) => {
    if (tipoEntrega === 'AQUI') {
      setTipoEntrega('LLEVAR');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(actualizarTipoEntrega('LLEVAR'));
    } else {
      setTipoEntrega('AQUI');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(actualizarTipoEntrega('AQUI'));
    }
  };
  const editarCantidad = (index: number, incremento: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(editarCantidadProducto(index, incremento));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(actualizarCuentaTotal());
  };

  // const productos =
  //   categoriaActual?.subcategorias[subcategoriaSeleccionada]?.productos;

  // const seleccionarModal = () => {
  //   if (productos.length > 0) {
  //     setModal2(true);
  //   } else {
  //     setModal2(false);
  //   }
  // };

  return (
    <div className=" w-full ">
      <div className="max-w-screen-xl w-11/2 m-auto">
        <h1 className="text-center text-primary font-bold text-[56px] pt-[116px] pb-[60px]">
          TU ORDEN
        </h1>
        <div className="w-full pb-8">
          <div className="max-w-screen-xl w-11/12 m-auto">
            <div className="flex justify-center items-center cursor-pointer rounded-2xl text-[24px] h-[96px] bg-primary mx-[124px]">
              <button
                className={`rounded-2xl w-1/2 mx-4 h-[70px] font-semibold text-[35px] text-center flex items-center justify-center ${
                  tipoEntrega === 'AQUI'
                    ? 'bg-white text-primary'
                    : 'bg-primary text-white'
                }`}
                onClick={() => cambioTipoEntrega('AQUI')}
              >
                Comer Aquí
              </button>
              <button
                className={`rounded-2xl w-1/2 mx-4 h-[70px] font-semibold text-[35px] text-center flex items-center justify-center ${
                  tipoEntrega === 'LLEVAR'
                    ? 'bg-white text-primary'
                    : 'bg-primary text-white'
                }`}
                onClick={() => cambioTipoEntrega('LLEVAR')}
              >
                Para llevar
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mx-[56px]  overflow-auto overflow-y-auto max-h-[1000px] scroll-hidden">
          <button
            className="btn btn-secondary ml-auto text-4xl font-bold rounded-[10px] mb-8"
            onClick={() => {
              navigate('/', { replace: true });
              window.location.reload();
            }}
          >
            Vaciar Canasta{' '}
          </button>

          {categoriaActual &&
            nuevaOrden.productos.map((producto, index) => (
              <div key={index}>
                <div className="flex justify-center ">
                  <div className="flex justify-between w-[98%] my-4  py-6 px-16 shadow-xl rounded-[40px] border-2 bg-white">
                    <div className="flex w-[550px] space-between gap-5 ">
                      <div>
                        <img
                          src={producto.imagen}
                          className="w-[200px] h-[200px] rounded-[20px] object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between ">
                        <h1 className=" text-[40px] font-semibold">
                          {producto.nombre}
                          <p className="text-[28px] font-bold text-primary">
                            {producto.subcategoriaNombre}
                          </p>
                        </h1>
                        {/*<div className="px-4">*/}
                        {/*  <dialog*/}
                        {/*    id="my_modal_5"*/}
                        {/*    className="modal modal-bottom transition-all duration-800"*/}
                        {/*  >*/}
                        {/*    {modal2 ? <Modal2 /> : <Modal1 />}*/}
                        {/*  </dialog>*/}
                        {/*  <button*/}
                        {/*    className="btn btn-ghost text-[24px] font-bold px-4"*/}
                        {/*    onClick={() => {*/}
                        {/*      // @ts-expect-error need to fix this*/}
                        {/*      document.getElementById('my_modal_5').showModal();*/}
                        {/*      seleccionarModal();*/}
                        {/*    }}*/}
                        {/*  >*/}
                        {/*    Modificar*/}
                        {/*  </button>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                    <div className="text-[40px] flex flex-col justify-between">
                      <div className="flex justify-end font-bold">
                        <p>Bs. {producto.precioTotal}</p>
                      </div>
                      <div className="flex w-[300px] justify-between items-center">
                        <button
                          className="w-[70px] h-[70px] items-center  rounded-full  flex justify-center mx-2"
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            dispatch(eliminarProducto(index));
                            if (nuevaOrden.productos.length === 0) {
                              navigate('/menu');
                            }
                          }}
                        >
                          <Icon
                            icon="iconamoon:trash-duotone"
                            className="w-full h-full flex items-center justify-center"
                          />
                        </button>
                        <button
                          className="w-[70px] h-[70px] items-center  rounded-full  flex justify-center mx-2"
                          onClick={() => {
                            editarCantidad(index, -1);
                          }}
                        >
                          <Icon
                            icon="zondicons:minus-outline"
                            className="w-full h-full flex items-center justify-center "
                          />
                        </button>
                        <button className="w-[70px] h-[70px] items-center   flex justify-center mx-2">
                          {producto.cantidad}
                        </button>
                        <button
                          className="w-[70px] h-[70px] items-center  flex justify-center mx-2"
                          onClick={() => {
                            editarCantidad(index, 1);
                          }}
                        >
                          <Icon
                            icon="zondicons:add-outline"
                            className="w-full h-full flex items-center justify-center "
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* SECCION DE TOTAL */}

        {/* SECCION DE BOTONES */}
        <div className="fixed bottom-0 left-0 right-0 ">
          <h1 className="text-center text-primary font-bold text-[56px] ">
            Total Bs.{nuevaOrden.cuentaTotal}
          </h1>
          <div className="text-center my-[100px]  flex justify-between mx-40 ">
            <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
              <Link
                to="/menu"
                className="w-full h-full flex items-center justify-center"
              >
                Volver
              </Link>
            </button>
            <button className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
              <Link
                to="/payment"
                className="w-full h-full flex items-center justify-center"
              >
                Ir a pagar
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
