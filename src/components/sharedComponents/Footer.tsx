// REDUX
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { Link } from 'react-router-dom';
import { ProductoNuevaOrden } from '../../interfaces/nuevaOrden.interface.ts';

export const Footer = () => {
  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const monedaPerfil = PerfilLocalStorage.moneda || 'Bs.';
  //count cantidad
  const amountTotal = nuevaOrden.productos.reduce(
    (acc, e: ProductoNuevaOrden) => acc + e.cantidad,
    0,
  );

  if (nuevaOrden.productos.length > 0) {
    return (
      <footer className="fixed bottom-0 w-screen text-[30px] text-center py-4 bg-white rounded-t-[60px] border-8 border-primary border-b-0">
        <div className="md:h-[9rem] lg:h-[12rem] font-bold flex justify-between items-center mx-11">
          <span className="md:text-2xl lg:text-4xl">
            {monedaPerfil} {nuevaOrden.cuentaTotal.toFixed(2)}
          </span>
          <span className="md:text-2xl lg:text-4xl text-gray-500">
            Cantidad: {amountTotal}
          </span>
          <Link
            to="/checkout"
            className="btn btn-primary md:text-2xl md:px-5 md:py-2 md:box-content lg:box-border lg:w-[330px] lg:h-[80px] lg:text-4xl rounded-[20px] lg:flex lg:justify-center lg:items-center"
          >
            Ver pedido
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/*<footer className="fixed bottom-0 w-screen text-3xl text-center py-4 bg-primary">*/}
      {/*  <h1 className="font-semibold text-3xl text-black dark:text-white">*/}
      {/*    powered by Bairu.io*/}
      {/*  </h1>*/}
      {/*</footer>*/}
    </>
  );
};
