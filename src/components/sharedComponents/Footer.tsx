// REDUX
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

export const Footer = () => {
  // TODO: si nuevaOrden.reducer tiene productos, entonces mostrar el resumen del pedido.

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);

  if (nuevaOrden.productos.length > 0) {
    console.log('cuentaTotal...', nuevaOrden.cuentaTotal);
    console.log('productos...', nuevaOrden.productos.length);
  }

  return (
    <footer className="fixed bottom-0 w-full  bg-primary text-[30px] text-center py-4  ">
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl dark:text-white text-dark">
          Powered by Bairü
        </h1>
      </div>
    </footer>
  );
};
