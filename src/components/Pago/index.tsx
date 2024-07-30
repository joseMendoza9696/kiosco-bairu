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
import { DatosPersonalesModal } from './DatosPersonalesModal.tsx';

export const Pago = () => {
  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [qrModal, setQrModal] = useState<boolean>(false);
  const [tarjetaModal, setTarjetaModal] = useState<boolean>(false);
  const [conFactura, setConFactura] = useState<boolean>(false);
  const [conDatosPersonales, setConDatosPersonales] = useState<boolean>(false);

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
      // @ts-expect-error need to fix this
      document.getElementById('my_modal_5').close();
      navigator('/pagoconfirmado');
    }
  };

  // SECCION DE BOTONES HABILITADOS
  const perfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const pagoEfectivoHabilitado = perfilLocalStorage?.pago_efectivo;
  const pagoTarjetaHabilitado = perfilLocalStorage?.pago_tarjeta;
  const pagoQrHabilitado = perfilLocalStorage?.pago_qr;

  useEffect(() => {
    const factura = facturaCheck();
    setConFactura(factura);
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
    if (factura) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, []);

  const nombreHabilitado = perfilLocalStorage.screens?.nombre;
  const telefonoHabilitado = perfilLocalStorage.screens?.telefono;

  useEffect(() => {
    setConDatosPersonales(nombreHabilitado || telefonoHabilitado);
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (nombreHabilitado || telefonoHabilitado) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [nombreHabilitado, telefonoHabilitado]);

  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');

  const monedaPerfil = PerfilLocalStorage?.moneda;

  return (
    <>
      {/* MODAL DE DATOS PERSONALES */}
      <dialog
        id="my_modal_3"
        className="modal modal-bottom  transition-all duration-800"
      >
        {conDatosPersonales && (
          <DatosPersonalesModal
            mostrarNombre={nombreHabilitado}
            mostrarTelefono={telefonoHabilitado}
            closeModal={() => {
              // @ts-expect-error need to fix this
              document.getElementById('my_modal_3').close();
            }}
          />
        )}
      </dialog>

      {/* MODAL DE FACTURA */}
      <dialog
        id="my_modal_2"
        className="modal modal-bottom  transition-all duration-800"
      >
        {conFactura && (
          <FacturaModal
            closeModal={() => {
              // @ts-expect-error need to fix this
              document.getElementById('my_modal_2').close();
            }}
          />
        )}
      </dialog>

      <div className="flex flex-col h-[90vh] items-center justify-evenly md:pt-[15%] md:gap-20">
        <div>
          <h1 className="md:text-4xl lg:text-5xl font-bold md:mb-12">
            ¿Cómo desea pagar?
          </h1>
          <h1 className="text-center text-primary font-bold md:text-4xl lg:text-5xl">
            Total {`${monedaPerfil} `} {nuevaOrden.cuentaTotal}
          </h1>
        </div>
        {/* SECCION DE BOTONES */}
        <div className="flex flex-wrap md:gap-12 justify-center">
          {pagoEfectivoHabilitado && (
            <button
              className="btn btn-primary box-content h-max flex flex-col md:text-3xl lg:text-5xl md:py-[2em] md:w-[8em] lg:py-[1em] lg:w-[8em] md:rounded-xl "
              onClick={() => {
                seleccionarPago('EFECTIVO');
              }}
            >
              <Icon icon="fa:dollar" height="3em" />
              <p>Efectivo</p>
            </button>
          )}
          {pagoQrHabilitado && (
            <button
              className="btn btn-primary box-content h-max flex flex-col md:text-3xl lg:text-5xl md:py-[2em] md:w-[8em] lg:py-[1em] lg:w-[8em] md:rounded-xl "
              onClick={() => {
                seleccionarPago('QR');
              }}
            >
              <Icon icon="material-symbols:qr-code" height="3em" />
              <p>QR</p>
            </button>
          )}
          {pagoTarjetaHabilitado && (
            <button
              className="btn btn-primary box-content h-max flex flex-col md:text-3xl lg:text-5xl md:py-[2em] md:w-[8em] lg:py-[1em] lg:w-[8em] md:rounded-xl "
              onClick={() => {
                seleccionarPago('TARJETA');
              }}
            >
              {' '}
              <Icon icon="bi:credit-card-fill" height="3em" />
              <p>Tarjeta</p>
            </button>
          )}
        </div>
        {/* FIN DE SECCION DE BOTONES */}

        {/* SECCION DEL MODAL  */}
        <dialog
          id="my_modal_5"
          className="modal modal-bottom  transition-all duration-800"
        >
          {/* // condicional para mostrar el modal de qr o modal de tarjeta */}
          {tarjetaModal && (
            <TarjetaModal
              cuentaTotal={nuevaOrden.cuentaTotal}
              closeModal={() => {
                setTarjetaModal(false);

                // @ts-expect-error need to fix this
                document.getElementById('my_modal_5').close();
              }}
            />
          )}
          {qrModal && (
            <QrModal
              cuentaTotal={nuevaOrden.cuentaTotal}
              closeModal={() => {
                setQrModal(false);

                // @ts-expect-error need to fix this
                document.getElementById('my_modal_5').close();
              }}
            />
          )}
        </dialog>

        {/* FIN DE SECCION DEL MODAL  */}

        {/* SECCION DE TOTAL */}
        <Link to="/checkout">
          <button className="btn md:text-3xl lg:text-4xl h-max md:py-[2.5em] md:w-[9em] rounded-2xl">
            Volver
          </button>
        </Link>
        {/* FIN DE SECCION DE TOTAL */}
      </div>
    </>
  );
};
