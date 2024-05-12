import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import { QrModal } from './QrModal';
import { TarjetaModal } from './TarjetaModal';

import { actualizarMetodoDePago } from '../../redux/actions/nuevaOrden.action';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { PROFILE_QUERY } from '../../api/graphql/query';
import { FacturaModal } from './FacturaModal';
import { CREAR_ORDEN } from '../../api/graphql/mutations.ts';
import { crearOrdenVariables } from '../../utils/Functions.tsx';

export const Pago = () => {
  // TODO: UI/UX como en figma.

  const navigate = useNavigate();
  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const dispatch = useDispatch();

  const [qrModal, setQrModal] = useState<boolean>(false);
  const [, setTarjetaModal] = useState<boolean>(false);
  const conFactura = true;

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

  const abrirPaginaAgradecimiento = () => {
    window.open('/recibo', '_blank');
  };

  const [crearOrden] = useMutation(CREAR_ORDEN, {
    onCompleted: (data) => {
      console.log(data);
      // TODO: IMPRIMIR UNA COMANDA
      // printJS({
      //   printable: [{ Monto: `Bs.${montoPago}` }],
      //   type: "json",
      //   properties: ["Monto"],
      //   header: `
      //           <h1>Orden: #${comandaNumero} ${
      //     nombreCliente !== "" ? ` - ${nombreCliente}` : ""
      //   }</h1>
      //           <h2>Método de pago: ${metodoPago}</h2>
      //         `,
      // });
      // TODO: ABRIR LA PAGINA DE AGRADECIMIENTO, durante 15 segundos luego se cierra
      abrirPaginaAgradecimiento();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data, loading, error } = useQuery(PROFILE_QUERY);

  if (loading) return <span className="loading loading-dots loading-lg"></span>;
  if (error) return <p>Error al cargar los datos</p>;

  const perfil = data?.KIOSCO_getPerfilActivo;

  const pagoEfectivoHabilitado = perfil?.pago_efectivo;
  const pagoTarjetaHabilitado = perfil?.pago_tarjeta;
  const pagoQrHabilitado = perfil?.pago_qr;

  const mandarOrden = () => {
    const ordenVariables = crearOrdenVariables(nuevaOrden);
    console.log('orden variables...', ordenVariables);
    crearOrden({
      variables: {
        orden: ordenVariables,
        fecha: new Date().toISOString(),
      },
    }).then();
  };

  const pagarEnEfectivo = async () => {
    seleccionarPago('EFECTIVO');
    mandarOrden();

    // navigate('/');
    // abrirPaginaAgradecimiento();
    // window.location.reload();
  };

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
              <button className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center">
                <Icon
                  icon="fa:dollar"
                  className="w-[120px] h-[120px]"
                  onClick={pagarEnEfectivo}
                />
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
