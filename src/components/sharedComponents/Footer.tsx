// REDUX
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const monedaPerfil = PerfilLocalStorage.moneda || 'Bs.';

  if (nuevaOrden.productos.length > 0) {
    return (
      <footer className="fixed bottom-0 w-screen text-[30px] text-center py-4 bg-white rounded-t-[60px] border-8 border-primary border-b-0">
        <div className="md:h-[9rem] lg:h-[12rem] font-bold flex justify-between items-center mx-11">
          <span className="md:text-3xl lg:text-4xl">
            {monedaPerfil} {nuevaOrden.cuentaTotal}
          </span>
          <span className="md:text-3xl lg:text-4xl text-gray-500">
            Productos: {nuevaOrden.productos.length}
          </span>
          <Link
            to="/checkout"
            className="btn btn-primary md:text-3xl md:px-5 md:py-2 md:box-content lg:box-border lg:w-[330px] lg:h-[80px] lg:text-[40px] rounded-[20px] lg:flex lg:justify-center lg:items-center"
          >
            Ver pedido
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 w-screen text-3xl text-center py-4 bg-primary">
      <h1 className="font-semibold text-3xl text-black dark:text-white">
        powered by Bairu.io
      </h1>
    </footer>
  );
};
