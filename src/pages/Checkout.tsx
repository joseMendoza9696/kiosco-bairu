import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { actualizarTipoEntrega } from '../redux/actions/nuevaOrden.action.ts';
import { useState } from 'react';

export const Checkout = () => {
  const dispatch = useDispatch();

  const productosSeleccionados = useSelector(
    (state: RootState) => state.nuevaOrdenReducer,
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

      {/* <h1>{productoSeleccionado.nombre}</h1> */}

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
          {/*{productosSeleccionados.map((producto, index) => (*/}
          {/*  <li key={index} className="flex items-center gap-4">*/}
          {/*    <img*/}
          {/*      src={producto.imagen}*/}
          {/*      alt={producto.nombre}*/}
          {/*      className="size-16 rounded object-cover"*/}
          {/*    />*/}

          {/*    <div>*/}
          {/*      <h3 className="text-sm text-gray-900">{producto.nombre}</h3>*/}

          {/*      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600"></dl>*/}
          {/*    </div>*/}

          {/*    <div className="flex flex-1 items-center justify-end gap-2">*/}
          {/*      /!* Botón para quitar el producto *!/*/}
          {/*      <button className="text-gray-600 transition hover:text-red-600">*/}
          {/*        <span className="sr-only">Remove item</span>*/}
          {/*        <svg*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*          fill="none"*/}
          {/*          viewBox="0 0 24 24"*/}
          {/*          strokeWidth="1.5"*/}
          {/*          stroke="currentColor"*/}
          {/*          className="h-4 w-4"*/}
          {/*        >*/}
          {/*          <path*/}
          {/*            strokeLinecap="round"*/}
          {/*            strokeLinejoin="round"*/}
          {/*            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"*/}
          {/*          />*/}
          {/*        </svg>*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*  </li>*/}
          {/*))}*/}
        </ul>
      </div>

      {/* SECCION DE BOTONES */}
      <div className="text-center my-[127px] space-x-[100px] ">
        <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
          Cancelar
        </button>
        <button className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
          Ir a pagar
        </button>
      </div>
    </div>
  );
};
