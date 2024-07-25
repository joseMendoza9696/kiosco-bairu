import { Icon } from '@iconify/react/dist/iconify.js';
// import imagen from '../../../public/Imagen.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { GET_TARJETA } from '../../api/graphql/query.ts';
import { PAGO_TARJETA_CONFIRMACION } from '../../api/graphql/subscriptions.ts';
// APOLLO GRAPHQL

interface ITarjetaModal {
  closeModal: any;
  cuentaTotal: number;
}

interface IPagoFallido {
  closeModal: any;
}

interface ISuscribirme {
  transaccionID: string;
  setMostrarErrorPago: any;
}

const Subscribirme = ({ transaccionID, setMostrarErrorPago }: ISuscribirme) => {
  // TODO: poner la moneda correspondiente
  // check
  const navigator = useNavigate();

  useSubscription(PAGO_TARJETA_CONFIRMACION, {
    variables: {
      transaccionID: transaccionID,
    },
    onSubscriptionComplete: () => {
      console.log('suscrito');
    },
    onSubscriptionData: (data) => {
      // console.log('Pago realizado...', data);
      if (
        data.subscriptionData.data.KIOSCO_pagoTarjetaConfirmacion.estado ===
        'APPROVED'
      ) {
        // @ts-expect-error need to fix this
        document.getElementById('my_modal_5').close();
        navigator('/pagoconfirmado');
      } else {
        setMostrarErrorPago(true);
      }
    },
  });

  return <></>;
};

const PagoFallido = ({ closeModal }: IPagoFallido) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-box md:h-[95%] bg-[base-100] rounded-t-[90px] md:pt-[5rem] lg:pt-[10rem] flex flex-col md:gap-20 items-center">
      <div className="md:h-[15%] lg:h-[16%] ">
        <Icon
          icon="icon-park-solid:close-one"
          className="text-red-500 h-full w-full"
        />
      </div>
      <h1 className="text-center md:text-5xl lg:text-6xl font-bold ">
        ERROR EN EL PAGO CON TARJETA, INTENTE OTRO MÉTODO DE PAGO
      </h1>
    </div>
  );
};

export const TarjetaModal = ({ closeModal, cuentaTotal }: ITarjetaModal) => {
  const navigator = useNavigate();
  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
  const monedaPerfil = PerfilLocalStorage?.moneda;

  const [transaccionID, setTransaccionID] = useState<string | undefined>();
  const [mostrarErrorPago, setMostrarErrorPago] = useState(false);
  const [ipPOS, setIpPOS] = useState<string>('');

  // FUNCTIONS
  function convertirNumero(number: number): number {
    const [wholePart, decimalPart] = number.toString().split('.');
    const wholeNumber = parseInt(wholePart, 10);
    let decimalNumber = decimalPart ? parseInt(decimalPart, 10) : 0;
    if (decimalNumber < 10 && decimalNumber > 0) {
      decimalNumber *= 10;
    }
    const shiftedNumber = wholeNumber * 100 + decimalNumber;

    return isNaN(shiftedNumber) ? 0 : shiftedNumber;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pagarConTarjetaLocal = async () => {
    try {
      const pagar = await axios.get(
        `http://${ipPOS}/sale?monto=${convertirNumero(
          cuentaTotal,
        )}&cod_moneda=068`,
        {
          timeout: 5000,
        },
      );
      // setEsperandoPago(true);
      if (pagar.data.estado === 'OK') {
        // setEsperandoPago(false);
        navigator('/pagoconfirmado');
      } else {
        // setEsperandoPago(false);
        setMostrarErrorPago(true);
      }
    } catch (error) {
      // setEsperandoPago(false);
      setMostrarErrorPago(true);
    }
  };

  const [tarjetaPaymentRequest] = useLazyQuery(GET_TARJETA, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setTransaccionID(data.KIOSCO_getPagoTarjeta.transaction_id);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    let infoKiosco: any = localStorage.getItem('InfoKiosco');
    infoKiosco = JSON.parse(infoKiosco);
    if (cuentaTotal > 0 && ipPOS !== '') {
      // console.log(infoKiosco);
      switch (infoKiosco.pago_tarjeta_info.empresa) {
        case 'LINKSER':
          pagarConTarjetaLocal().then();
          break;
        default:
          break;
      }
    }
  }, [ipPOS, cuentaTotal, pagarConTarjetaLocal]);

  // USE EFFECT PRINCIPAL
  useEffect(() => {
    let infoKiosco: any = localStorage.getItem('InfoKiosco');
    infoKiosco = JSON.parse(infoKiosco);
    if (infoKiosco !== undefined) {
      switch (infoKiosco.pago_tarjeta_info.empresa) {
        case 'CLIP':
          console.log('cuenta total ...', typeof cuentaTotal);
          tarjetaPaymentRequest({
            variables: {
              pedido: {
                precio: cuentaTotal,
              },
            },
          }).then();
          break;
        case 'LINKSER':
          setIpPOS(infoKiosco.pago_tarjeta_info.ipLocal);
          break;
        default:
          break;
      }
    }
  }, []);

  return (
    <>
      {mostrarErrorPago ? (
        <PagoFallido closeModal={closeModal} />
      ) : (
        <div className="modal-box md:h-[95%] bg-[base-100] rounded-t-[90px] md:pt-[8rem] lg:pt-[15rem] flex flex-col md:gap-28">
          <h1 className="font-bold text-center md:text-5xl lg:text-7xl">
            Pase su tarjeta por el lector{' '}
          </h1>
          <h2 className="text-center text-primary font-bold md:text-6xl">
            Total {monedaPerfil}
            {cuentaTotal}
          </h2>
          <div className="md:h-[40%]">
            <img
              src="https://media1.giphy.com/media/Z4iefvSI2VEOTdud7r/giphy.gif"
              alt="producto"
              className="h-full mx-auto"
            />
          </div>
          {transaccionID !== undefined && (
            <Subscribirme
              transaccionID={transaccionID}
              setMostrarErrorPago={setMostrarErrorPago}
            />
          )}
        </div>
      )}
    </>
  );
};
