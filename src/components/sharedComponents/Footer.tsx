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
      <footer className="fixed bottom-0 w-full text-[30px] text-center py-4 bg-white rounded-t-[60px] border-8 border-primary border-b-0">
        <div className="h-[235px] font-bold flex justify-between items-center mx-11">
          <span className="text-5xl">
            {monedaPerfil} {nuevaOrden.cuentaTotal}
          </span>
          <span className="text-5xl text-gray-500">
            Productos: {nuevaOrden.productos.length}
          </span>
          <Link
            to="/checkout"
            className="btn btn-primary w-[330px] h-[80px] text-[40px] rounded-[20px] flex justify-center items-center"
          >
            Ver pedido
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 w-full text-[30px] text-center py-4 bg-primary">
      <h1 className="font-semibold text-3xl text-black dark:text-white">
        powered by Bairu.io
      </h1>
    </footer>
  );
};
