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
      <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px] ">
        <div className="flex items-center flex-col  ">
          <button
            className="btn btn-square w-24 flex item"
            onClick={() => {
              closeModal();
            }}
          >
            X
          </button>
          <h1 className="text-[60px] font-bold pt-[160px]">
            Por favor, escanea este QR
          </h1>
          <h2 className="text-center text-primary font-bold text-[50px]  py-8">
            Total {monedaPerfil} {cuentaTotal}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center pt-[140px]">
          {QRloading ? (
            <Icon icon="svg-spinners:blocks-wave" className="text-5xl" />
          ) : (
            imagenQR !== undefined && (
              <img src={imagenQR} alt="QR Code" className="w-1/2 h-1/2" />
            )
          )}
        </div>
        <div className="text-center flex justify-center mx-40 pt-[200px]">
          <button
            className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
            onClick={() => {
              closeModal();
            }}
          >
            Volver
          </button>
        </div>
        {transaccionID !== undefined && (
          <Subscribirme transaccionID={transaccionID} />
        )}
      </div>
    </>
  );
};
