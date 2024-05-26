// REACT
import { useEffect, useState } from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { actualizarMetodoDePago } from '../../redux/actions/nuevaOrden.action';
import { RootState } from '../../redux/store';
// ROUTES
import { Link, useNavigate } from 'react-router-dom';
// COMPONENTS
import { QrModal } from './QrModal';
import { TarjetaModal } from './TarjetaModal';
import { FacturaModal } from './FacturaModal';

// GRAPHQL

// UTILS
import { Icon } from '@iconify/react/dist/iconify.js';
import { facturaCheck } from '../../utils/Functions.tsx';

export const Pago = () => {
  // TODO: UI/UX como en figma.
  // TODO: cuando el pago sea confirmado utilizar un nuevo pages llamado PagoConfirmado

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [qrModal, setQrModal] = useState<boolean>(false);
  const [, setTarjetaModal] = useState<boolean>(false);
  const [conFactura, setConFactura] = useState<boolean>(false);

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

    if (metodoDePago === 'EFECTIVO') {
      // Actualizar el estado para indicar que se ha seleccionado un método de pago
      // TODO: abrir nueva pagina de PagoConfirmado.tsx. mandar la orden al backend, imprimir la orden, abrir la pagina de agradecimiento.
      // @ts-expect-error need to fix this
      document.getElementById('my_modal_5').close();
      navigator('/pagoconfirmado');
    }
  };

  // const pagarEnEfectivo = async () => {
  //   seleccionarPago('EFECTIVO');
  //   setTimeout(() => {
  //     mandarOrden();
  //   }, 500);

  //   // navigate('/');
  //   // abrirPaginaAgradecimiento();
  //   // window.location.reload();
  // };

  // SECCION DE BOTONES HABILITADOS
  const perfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const pagoEfectivoHabilitado = perfilLocalStorage?.pago_efectivo;
  const pagoTarjetaHabilitado = perfilLocalStorage?.pago_tarjeta;
  const pagoQrHabilitado = perfilLocalStorage?.pago_qr;

  useEffect(() => {
    const factura = facturaCheck();
    setConFactura(factura);
  }, []);

  return (
    <>
      <dialog
        open={conFactura}
        id="my_modal_1"
        className="modal modal-bottom  transition-all duration-800"
      >
        {conFactura && (
          <FacturaModal
            closeModal={() => {
              // @ts-expect-error need to fix this
              document.getElementById('my_modal_1').close();
            }}
          />
        )}
      </dialog>

      <div className="flex items-center flex-col pt-[132px] ">
        <h1 className="text-[60px] font-bold ">¿Cómo desea pagar?</h1>
        {/* SECCION DE BOTONES */}
        <div className="w-[90%] flex items-center flex-wrap justify-center pt-[347px]">
          <div className="w-1/2 flex justify-center ">
            {pagoEfectivoHabilitado && (
              <button
                className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center"
                onClick={() => {
                  seleccionarPago('EFECTIVO');
                }}
              >
                <Icon icon="fa:dollar" className="w-[120px] h-[120px]" />
                <p className="text-3xl">Efectivo</p>
              </button>
            )}
          </div>

          <div className="w-1/2 flex justify-center -ml-16">
            {pagoQrHabilitado && (
              <button
                className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center"
                onClick={() => {
                  seleccionarPago('QR');
                }}
              >
                <Icon
                  icon="material-symbols:qr-code"
                  className="w-[120px] h-[120px]"
                />
                <p className="text-3xl">QR</p>
              </button>
            )}
          </div>
          <div className="w-1/2 flex justify-center pt-16">
            {pagoTarjetaHabilitado && (
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
            )}
          </div>
        </div>
        {/* FIN DE SECCION DE BOTONES */}

        {/* SECCION DEL MODAL  */}
        <dialog
          id="my_modal_5"
          className="modal modal-bottom  transition-all duration-800"
        >
          {/* // condicional para mostrar el modal de qr o modal de tarjeta */}
          {qrModal ? (
            <QrModal
              cuentaTotal={nuevaOrden.cuentaTotal}
              closeModal={() => {
                setQrModal(false);

                // @ts-expect-error need to fix this
                document.getElementById('my_modal_5').close();
              }}
            />
          ) : (
            <TarjetaModal
              cuentaTotal={nuevaOrden.cuentaTotal}
              closeModal={() => {
                setTarjetaModal(false);
                // @ts-expect-error need to fix this
                document.getElementById('my_modal_5').close();
              }}
            />
          )}
        </dialog>

        {/* FIN DE SECCION DEL MODAL  */}

        {/* SECCION DE TOTAL */}
        <div className="py-32">
          <h1 className="text-center text-primary font-bold text-[56px]  ">
            Total Bs.{nuevaOrden.cuentaTotal}
          </h1>
          <div className="text-center flex justify-between mx-40 pt-20">
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
