import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

export const Pago = () => {
  // TODO: UI/UX como en figma.
  // TODO: crear el modal de la factura. "seguir sin datos" cierras el modal, "seguir" cierras el modal.
  // TODO: si se ecoge pago en efectivo: redireccionar a la bienvenida y recargar la pagina (window.location.reload();). REDUX ACTION: actualizarMetodoDePago("EFECTIVO")
  // CHECK
  // TODO: si se escoge QR, se abre el modal del QR. REDUX ACTION: actualizarMetodoDePago("QR")
  // TODO: si se escoge tarjeta, se abre el modal de tarjeta. REDUX ACTION: actualizarMetodoDePago("TARJETA")

  const navigate = useNavigate();

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const metodoPago = nuevaOrden.metodoPago;

  console.log(metodoPago);

  return (
    <>
      <div className="flex items-center flex-col pt-[132px] ">
        <h1 className="text-[60px] font-bold ">¿Cómo desea pagar?</h1>
        <div className="w-[90%] flex items-center flex-wrap justify-center pt-[347px]">
          <div className="w-1/2 flex justify-center ">
            <button className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center">
              <Icon
                icon="fa:dollar"
                className="w-[120px] h-[120px]"
                onClick={() => {
                  navigate('/');
                  window.location.reload();
                }}
              />
              <p className="text-3xl">Efectivo</p>
            </button>
          </div>
          <div className="w-1/2 flex justify-center -ml-16">
            <button className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center">
              <Icon
                icon="material-symbols:qr-code"
                className="w-[120px] h-[120px]"
              />
              <p className="text-3xl">QR</p>
            </button>
          </div>
          <div className="w-1/2 flex justify-center pt-16">
            <button className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center">
              {' '}
              <Icon
                icon="bi:credit-card-fill"
                className="w-[120px] h-[120px]"
              />
              <p className="text-3xl">Tarjeta</p>
            </button>
          </div>
        </div>
        <div className="py-32">
          <h1 className="text-center text-primary font-bold text-[56px]  ">
            Total Bs.{nuevaOrden.cuentaTotal}
          </h1>
          <div className="text-center   flex justify-between mx-40 pt-20">
            <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
