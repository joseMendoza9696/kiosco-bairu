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
        <div className="container mx-auto flex justify-center items-center bg-white rounded-3xl">
          <div className="h-[242px] font-bold flex justify-center items-center space-x-8 gap-x-9">
            <span className="text-[60px]">
              {monedaPerfil} {nuevaOrden.cuentaTotal}{' '}
            </span>
            <span className="text-[50px] text-gray-500">
              Productos: {nuevaOrden.productos.length}{' '}
            </span>
            <Link
              to="/checkout"
              className="btn btn-primary w-[330px] h-[80px] text-[40px] rounded-[20px] flex justify-center items-center"
            >
              Ver pedido
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 w-full text-[30px] text-center py-4 bg-primary">
      <h1 className="font-black text-3xl text-black dark:text-white">
        powered by Bairu.io
      </h1>
    </footer>
  );
};
