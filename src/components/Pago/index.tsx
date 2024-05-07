import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import { QrModal } from './QrModal';

import { TarjetaModal } from './TarjetaModal';

import { actualizarMetodoDePago } from '../../redux/actions/nuevaOrden.action';

export const Pago = () => {
  // TODO: UI/UX como en figma.
  // TODO: crear el modal de la factura. "seguir sin datos" cierras el modal, "seguir" cierras el modal.
  // TODO: si se ecoge pago en efectivo: redireccionar a la bienvenida y recargar la pagina (window.location.reload();). REDUX ACTION: actualizarMetodoDePago("EFECTIVO")
  // CHECK
  // TODO: si se escoge QR, se abre el modal del QR. REDUX ACTION: actualizarMetodoDePago("QR")

  // TODO: si se escoge tarjeta, se abre el modal de tarjeta. REDUX ACTION: actualizarMetodoDePago("TARJETA")

  const navigate = useNavigate();
  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const dispatch = useDispatch();

  const [qrModal, setQrModal] = useState<boolean>(false);
  const [tarjetaModal, setTarjetaModal] = useState<boolean>(false);

  const seleccionarPago = (metodoDePago: string) => {
    // @ts-expect-error need to fix this
    dispatch(actualizarMetodoDePago(metodoDePago));
    if (metodoDePago === 'QR') {
      // @ts-expect-error need to fix this
      document.getElementById('my_modal_5').showModal();

      setQrModal(true);
    }
    if (metodoDePago === 'TARJETA') {
      setTarjetaModal(true);
      // @ts-expect-error need to fix this
      document.getElementById('my_modal_5').showModal();
    }
  };

  return (
    <>
      <div className="flex items-center flex-col pt-[132px] ">
        <h1 className="text-[60px] font-bold ">¿Cómo desea pagar?</h1>
        {/* SECCION DE BOTONES */}
        <div className="w-[90%] flex items-center flex-wrap justify-center pt-[347px]">
          <div className="w-1/2 flex justify-center ">
            <button className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center">
              <Icon
                icon="fa:dollar"
                className="w-[120px] h-[120px]"
                onClick={() => {
                  navigate('/');
                  window.location.reload();
                  seleccionarPago('EFECTIVO');
                }}
              />
              <p className="text-3xl">Efectivo</p>
            </button>
          </div>

          <div className="w-1/2 flex justify-center -ml-16">
            <button
              className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center"
              onClick={() => {
                seleccionarPago('EFECTIVO');
              }}
            >
              <Icon
                icon="material-symbols:qr-code"
                className="w-[120px] h-[120px]"
              />
              <p className="text-3xl">QR</p>
            </button>
          </div>
          <div className="w-1/2 flex justify-center pt-16">
            <button
              className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center"
              onClick={() => {
                seleccionarPago('TARJETA');
              }}
            >
              {' '}
              <Icon
                icon="bi:credit-card-fill"
                className="w-[120px] h-[120px]"
              />
              <p className="text-3xl">Tarjeta</p>
            </button>
          </div>
        </div>
        {/* FIN DE SECCION DE BOTONES */}

        {/* SECCION DEL MODAL  */}
        <dialog
          id="my_modal_5"
          className="modal modal-bottom  transition-all duration-800"
        >
          {qrModal && (
            <QrModal isOpen={qrModal} onClose={() => setQrModal(false)} />
          )}
          {tarjetaModal && (
            <TarjetaModal
              isOpen={tarjetaModal}
              onClose={() => setTarjetaModal(false)}
            />
          )}
        </dialog>

        {/* FIN DE SECCION DEL MODAL  */}

        {/* SECCION DE TOTAL */}
        <div className="py-32">
          <h1 className="text-center text-primary font-bold text-[56px]  ">
            Total Bs.{nuevaOrden.cuentaTotal}
          </h1>
          <div className="text-center   flex justify-between mx-40 pt-20">
            <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
              <Link
                to="/checkout"
                className="w-full h-full flex items-center justify-center"
              >
                Volver
              </Link>
            </button>
          </div>
        </div>
        {/* FIN DE SECCION DE TOTAL */}
      </div>
    </>
  );
};
