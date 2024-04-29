// REDUX
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

export const Footer = () => {
  //TODO: mejorar el footer segun figma.

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);

  if (nuevaOrden.productos.length > 0) {
    console.log('cuentaTotal...', nuevaOrden.cuentaTotal);
    console.log('productos...', nuevaOrden.productos.length);
  }

  return (
    <footer className="fixed bottom-0 w-full   text-[30px] text-center py-4 bg-white  rounded-t-3xl  border-8 border-primary">
      <div className="container mx-auto  flex justify-center items-center">
        {nuevaOrden.productos.length > 0 ? (
          <>
            <div className="h-[242px] font-bold flex justify-center items-center space-x-4 gap-x-9">
              <span className="  text-[60px]">
                Bs. {nuevaOrden.cuentaTotal}{' '}
              </span>

              <span className="text-[50px] text-gray-500">
                Productos: {nuevaOrden.productos.length}{' '}
              </span>
              <button className="btn btn-primary text-[30px]">
                Ver Pedido
              </button>
            </div>
          </>
        ) : (
          <h1 className="font-bold text-3xl   ">Powered by Bairü</h1>
        )}{' '}
      </div>
    </footer>
  );
};
