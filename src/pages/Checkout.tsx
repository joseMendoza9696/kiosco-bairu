import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import {
  actualizarTipoEntrega,
  eliminarProducto,
  editarCantidadProducto,
  actualizarCuentaTotal,
} from '../redux/actions/nuevaOrden.action.ts';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Icon } from '@iconify/react/dist/iconify.js';

export const Checkout = () => {
  // TODO: solucionar los botones para escoger el tipo de entrega para llevar o aqui en base al figma
  // TODO: estética en base a figma
  // TODO: si nueva orden.productos es longitud 0 retornar a la pagina del menu.
  // CHECK
  // TODO: solucionar bug de las cantidades en los modals 1 y 2
  // CHECK
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);

  const [tipoEntrega, setTipoEntrega] = useState<string>('AQUI');

  const cambioTipoEntrega = () => {
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

  return (
    <div className=" w-full ">
      <div className="max-w-screen-xl w-11/2 m-auto">
        <h1 className="text-center text-primary font-bold text-[56px] pt-[116px] pb-[60px]">
          TU ORDEN
        </h1>
        {/* SECCION DEL TOOGLE */}
        <div className=" w-full pb-8">
          <div className="max-w-screen-xl w-11/2 m-auto ">
            <label
              htmlFor="Toggle3"
              className=" items-center  flex justify-center cursor-pointer rounded-xl  text-[24px] h-[96px]"
            >
              <input
                id="Toggle3"
                type="checkbox"
                className="hidden peer"
                value={tipoEntrega}
                onChange={cambioTipoEntrega}
              />
              <span className="  rounded-l-2xl bg-primary peer-checked:bg-white w-1/3 py-[35px] text-white peer-checked:text-primary text-[32px] text-center">
                Comer Aquí
              </span>
              <span className=" rounded-r-2xl  text-center bg-white peer-checked:bg-primary w-1/3 py-[35px]  text-primary peer-checked:text-white text-[32px]">
                Para llevar
              </span>
            </label>
          </div>
        </div>

        {/* SECCION DE PRODUCTOS */}
        <div className="flex flex-wrap mx-[56px]  overflow-auto overflow-y-auto max-h-[1000px]">
          {nuevaOrden.productos.map((producto, index) => (
            <div className="" key={index}>
              <div className="flex justify-center ">
                <div className="flex justify-between w-[91%] my-10  py-10 px-8 shadow-xl rounded-2xl border-2">
                  <div className="flex w-[550px] space-between gap-5">
                    <div>
                      <img
                        src={producto.imagen}
                        className="w-[200px] h-[200px] rounded-[20px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between ">
                      <h1 className="text-primary text-[30px] font-bold">
                        {producto.nombre}
                      </h1>
                      {/*<button className=" btn btn-gosth text-[24px] font-bold">*/}
                      {/*  {producto.}*/}
                      {/*</button>*/}
                    </div>
                  </div>
                  <div className="text-[40px] flex flex-col justify-between">
                    <div className="flex justify-end">
                      <p>Bs. {producto.precioTotal}</p>
                    </div>
                    <div className="flex w-[300px] justify-between items-center">
                      <button
                        className="w-[70px] h-[70px] items-center  rounded-full flex justify-center "
                        onClick={() => {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-expect-error
                          dispatch(eliminarProducto(index));
                          if (index === 0) {
                            navigate('/menu');
                          }
                        }}
                      >
                        <Icon
                          icon="ic:outline-cancel"
                          className="w-full h-full flex items-center justify-center"
                        />
                      </button>
                      <button
                        className="w-[70px] h-[70px] items-center  rounded-full  flex justify-center "
                        onClick={() => {
                          editarCantidad(index, -1);
                        }}
                      >
                        <Icon
                          icon="zondicons:minus-outline"
                          className="w-full h-full flex items-center justify-center"
                        />
                      </button>
                      <button className="w-[70px] h-[70px] items-center   flex justify-center ">
                        {producto.cantidad}
                      </button>
                      <button
                        className="w-[70px] h-[70px] items-center  flex justify-center "
                        onClick={() => {
                          editarCantidad(index, 1);
                        }}
                      >
                        <Icon
                          icon="zondicons:add-outline"
                          className="w-full h-full flex items-center justify-center"
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
        <div className="fixed bottom-0 left-0 right-0">
          <h1 className="text-center text-primary font-bold text-[56px]  ">
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
