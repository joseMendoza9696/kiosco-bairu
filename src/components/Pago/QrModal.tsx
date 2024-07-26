import { useLazyQuery, useSubscription } from '@apollo/client';
import { GET_QR } from '../../api/graphql/query';
import { useEffect, useState } from 'react';
import { PAGO_QR_CONFIRMACION } from '../../api/graphql/subscriptions.ts';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

interface IQRModal {
  closeModal: any;
  cuentaTotal: number;
}

interface ISuscribirme {
  transaccionID: number | string;
}

const Subscribirme = ({ transaccionID }: ISuscribirme) => {
  // TODO: poner la moneda correspondiente
  // check
  const navigator = useNavigate();

  useSubscription(PAGO_QR_CONFIRMACION, {
    variables: {
      transaccionID: transaccionID,
    },
    onSubscriptionComplete: () => {
      console.log('suscrito');
    },
    onSubscriptionData: (data) => {
      console.log('Pago realizado', data);
      // @ts-expect-error need to fix this
      document.getElementById('my_modal_5').close();
      navigator('/pagoconfirmado');
    },
  });

  return <></>;
};
const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
const monedaPerfil = PerfilLocalStorage?.moneda;

export const QrModal = ({ closeModal, cuentaTotal }: IQRModal) => {
  const [imagenQR, setImagenQR] = useState<string | undefined>();
  const [transaccionID, setTransaccionID] = useState<
    string | number | undefined
  >();

  const [getQr, { loading: QRloading }] = useLazyQuery(GET_QR, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setImagenQR(data.KIOSCO_getPagoQR.imagen);
      setTransaccionID(data.KIOSCO_getPagoQR.transaccionID);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    getQr({
      variables: {
        pedido: {
          precio: cuentaTotal,
          data: 'NUEVAVERSION',
        },
      },
    }).then();
  }, [cuentaTotal, getQr]);

  return (
    <>
      <div className="modal-box bg-base-100 rounded-t-[5.625rem] md:h-[92%] lg:h-[87%] md:px-10 lg:px-24 md:pt-[18%] lg:pt-[20%] text-center  ">
        <form method="dialog">
          <button
            className="btn rounded-t-none rounded-b-3xl absolute top-0 md:left-[calc(50%-5rem)] lg:left-[calc(50%-5.375rem)] md:h-20 md:w-40 lg:h-28 lg:w-48 text-5xl"
            onClick={() => {
              closeModal();
            }}
          >
            <Icon icon="material-symbols-light:close" />
          </button>
        </form>
        <h1 className="font-bold md:text-5xl md:mb-[3%]">
          Por favor, escanea este QR
        </h1>
        <h2 className="text-center text-primary font-bold md:text-4xl md:mb-[3%] lg:mb-[5%] ">
          Total {monedaPerfil} {cuentaTotal}
        </h2>
        <div className="flex items-center justify-center md:mb-14 lg:mb-28 md:h-[30rem] lg:h-[40rem] ">
          {QRloading ? (
            <Icon
              icon="svg-spinners:blocks-wave"
              className="w-max md:h-[40%] "
            />
          ) : (
            imagenQR !== undefined && (
              <img src={imagenQR} alt="QR Code" className="h-full" />
            )
          )}
        </div>
        <button
          className="btn rounded-3xl h-max box-content md:py-[1.5em] md:w-[6em] md:text-4xl lg:text-6xl"
          onClick={() => {
            closeModal();
          }}
        >
          Volver
        </button>
        {transaccionID !== undefined && (
          <Subscribirme transaccionID={transaccionID} />
        )}
      </div>
    </>
  );
};
