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
import { Modal2 } from './Modal2.tsx';
// import { Modal1 } from './Modal1.tsx';
// import { Modal2 } from './Modal2.tsx';

// import { editarProductoOrden } from '../../redux/actions/editarOrden.action.ts';

export const Checkout = () => {
  // TODO: "comer aqui" y "para llevar" son botones diferentes.
  // check
  // TODO: dar mejor estilo al boton de "modificar"

  // TODO: utilizar el useSelector para editarOrden State.
  // TODO: 2. crear modals 1 y 2 en la carpeta checkout. Cuando la gente haga click en modificar se abrir el modal correspondiente

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // const editarOrden = useSelector(
  //   (state: RootState) => state.editarOrdenReducer,
  // );

  // const [modal2, setModal2] = useState<boolean>(false);

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

        <div className="flex flex-wrap mx-[50px]  overflow-auto overflow-y-auto max-h-[1000px] scroll-hidden">
          <button
            className="btn btn-lg bg-[#FFD4DE] text-[#FF0816] ml-auto text-3xl font-bold rounded-[10px] mb-8"
            onClick={() => {
              navigate('/', { replace: true });
              window.location.reload();
            }}
          >
            Vaciar canasta
          </button>

          {categoriaActual &&
            nuevaOrden.productos.map((producto, index) => (
              <div key={index}>
                <div className="flex justify-center ">
                  <div className="flex justify-between w-[98%] my-4  py-6 px-14 shadow-xl rounded-[40px] border-2 bg-white">
                    <div className="flex w-[550px] space-between gap-5 ">
                      <div className="w-[125px]">
                        <img
                          src={producto.imagen}
                          className="w-[125px] h-[125px] rounded-[20px] object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between ">
                        <h1 className=" text-[40px] font-semibold">
                          {producto.nombre}
                          <p className="text-[28px] font-bold text-primary">
                            {producto.subcategoriaNombre}
                          </p>
                        </h1>
                        <button
                          className="btn btn-outline btn-lg rounded-3xl text-3xl px-10 max-w-min"
                          onClick={() =>
                            (
                              document.getElementById(
                                'checkout2',
                              ) as HTMLDialogElement
                            ).showModal()
                          }
                        >
                          Modificar
                        </button>
                      </div>
                    </div>
                    <div className="text-[40px] flex flex-col justify-between">
                      <div className="flex justify-end font-bold">
                        <p>
                          {monedaPerfil} {producto.precioTotal}
                        </p>
                      </div>
                      <div className="flex w-[300px] justify-between items-center gap-3">
                        <button
                          className="w-[3.5rem] mr-3 items-center rounded-full flex justify-center"
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
                            width="2rem"
                            height="2rem"
                            icon="iconamoon:trash-duotone"
                            className="w-full h-full flex items-center justify-center"
                          />
                        </button>
                        <button
                          className="w-[3.5rem] items-center  rounded-full  flex justify-center"
                          onClick={() => {
                            editarCantidad(index, -1);
                          }}
                        >
                          <Icon
                            width="2rem"
                            height="2rem"
                            icon="zondicons:minus-outline"
                            className="w-full h-full flex items-center justify-center "
                          />
                        </button>
                        <button className="min-w-[4rem] items-center flex justify-center">
                          {producto.cantidad}
                        </button>
                        <button
                          className="w-[3.5rem] items-center  flex justify-center"
                          onClick={() => {
                            editarCantidad(index, 1);
                          }}
                        >
                          <Icon
                            width="2rem"
                            height="2rem"
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
        {/* <Modal1></Modal1> */}
        <Modal2></Modal2>
        {/* SECCION DE BOTONES */}
        <div className="fixed bottom-0 left-0 w-full">
          <h1 className="text-center text-primary font-bold text-[56px] pt-10">
            Total {monedaPerfil} {nuevaOrden.cuentaTotal}
          </h1>
          <div className="text-center flex justify-between mx-40 my-20">
            <button className="btn btn-gosth w-[329px] h-[190px] text-5xl rounded-[20px] mb-16">
              <Link
                to="/menu"
                className="w-full h-full flex items-center justify-center"
              >
                Volver
              </Link>
            </button>
            <button className="btn btn-primary w-[329px] h-[190px] text-5xl rounded-[20px] mb-16">
              <Link
                to="/payment"
                className="w-full h-full flex items-center justify-center text-white"
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
