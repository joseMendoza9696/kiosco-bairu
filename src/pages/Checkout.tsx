import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { actualizarTipoEntrega } from '../redux/actions/nuevaOrden.action.ts';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const dispatch = useDispatch();

  const productosSeleccionados = useSelector(
    (state: RootState) => state.nuevaOrdenReducer.productos,
  );

  console.log('productos seleccionados...', productosSeleccionados);

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
  console.log(tipoEntrega);

  return (
    <div className=" text-center pt-[80px]">
      <h1 className="  text-primary font-bold text-[48px]">TU ORDEN</h1>

      {/* SECCION DEL TOOGLE */}
      <label
        htmlFor="Toggle3"
        className="inline-flex items-center p-2  cursor-pointer rounded-xl w-[-840px] text-[24px] text-white h-[96px]"
      >
        <input
          id="Toggle3"
          type="checkbox"
          className="hidden peer"
          value={tipoEntrega}
          onChange={cambioTipoEntrega}
        />
        <span className="px-4 py-2 rounded-l-md bg-primary peer-checked:bg-white">
          Comer Aquí
        </span>
        <span className="px-4 py-2 rounded-r-md bg-white peer-checked:bg-primary">
          Para llevar
        </span>
      </label>

      {/* SECCION DE PRODUCTOS */}

      <div className="mt-8">
        <ul className="space-y-4">
          {productosSeleccionados.map((producto, index) => (
            <li key={index} className="flex items-center gap-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="size-16 rounded object-cover"
              />

              <div>
                <h3 className="text-sm text-gray-900">{producto.nombre}</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600"></dl>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* SECCION DE BOTONES */}
      <div className="text-center my-[127px] space-x-[100px] ">
        <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
          <Link to="/menu">Cancelar</Link>
        </button>
        <button className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
          Ir a pagar
        </button>
      </div>
    </div>
  );
};
