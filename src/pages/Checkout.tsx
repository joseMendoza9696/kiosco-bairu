import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import {
  actualizarTipoEntrega,
  eliminarProducto,
  editarCantidadProducto,
} from '../redux/actions/nuevaOrden.action.ts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

export const Checkout = () => {
  // TODO: utilizar iconos para las acciones de los productos
  // CHECK
  // TODO: solucionar el scroll, que no se haga scroll en toda la pantalla
  // TODO: solucionar el link de los botones de "volver" e "ir a pagar"
  // CHECK
  // TODO: solucionar los botones para escoger el tipo de entrega para llevar o aqui en base al figma

  // TODO: estética en base a figma
  // TODO: hacer funcionar los botones "eliminar", "editar cantidad". x (eliminarProducto()), -, + (editarCantidadProducto()).
  const dispatch = useDispatch();

  const productosSeleccionados = useSelector(
    (state: RootState) => state.nuevaOrdenReducer.productos,
  );

  const [tipoEntrega, setTipoEntrega] = useState<string>('AQUI');
  const [cantidad, setCantidad] = useState<number>(1);

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
  const editarCantidad = (incremento: number) => {
    setCantidad((cantidadPrevia) => {
      const cantidadNueva = cantidadPrevia + incremento;
      const cantidadMinima = Math.max(cantidadNueva, 1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(editarCantidadProducto(incremento));
      return cantidadMinima;
    });
  };

  console.log(tipoEntrega);

  return (
    <div className=" w-full ">
      <div className="max-w-screen-xl w-11/2 m-auto">
        <h1 className="text-center text-primary font-bold text-[56px] pt-[116px] pb-[60px]">
          TU ORDEN
        </h1>
        {/* SECCION DEL TOOGLE */}
        <div className=" w-full ">
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
          {productosSeleccionados.map((producto, index) => (
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
                      <button className=" btn btn-gosth text-[24px] font-bold">
                        {' '}
                        Descripcion del producto
                      </button>
                    </div>
                  </div>
                  <div className="text-[40px] flex flex-col justify-between">
                    <div className="flex justify-end">
                      <p>Bs. {producto.precioOriginal}</p>
                    </div>
                    <div className="flex w-[300px] justify-between items-center">
                      <button
                        className="w-[70px] h-[70px] items-center  rounded-full flex justify-center "
                        onClick={() => {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-expect-error
                          dispatch(eliminarProducto(index));
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
                          editarCantidad(-1);
                        }}
                      >
                        <Icon
                          icon="zondicons:minus-outline"
                          className="w-full h-full flex items-center justify-center"
                        />
                      </button>
                      <button className="w-[70px] h-[70px] items-center   flex justify-center ">
                        {cantidad}
                      </button>
                      <button
                        className="w-[70px] h-[70px] items-center  flex justify-center "
                        onClick={() => {
                          editarCantidad(1);
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
            Total Bs.{' '}
            {productosSeleccionados.reduce(
              (acc, curr) => acc + curr.precioTotal,
              0,
            )}
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
              Ir a pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
