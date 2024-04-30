// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store.ts';

export const Checkout = () => {
  //   const productoSeleccionado = useSelector(
  //     (state: RootState) =>
  //       state.nuevaOrdenReducer.productos[
  //         state.nuevaOrdenReducer.productos.length - 1
  //       ],
  //   );

  return (
    <div className=" ">
      <h1 className="  text-primary font-bold text-[48px]">TU ORDEN</h1>
      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className="tab bg-primary">
          Comer aquí{' '}
        </a>
        <a role="tab" className="tab tab-active">
          Para llevar{' '}
        </a>
      </div>
      {/* <h1>{productoSeleccionado.nombre}</h1> */}

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
