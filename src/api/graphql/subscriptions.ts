import { gql } from '@apollo/client';

export const PAGO_QR_CONFIRMACION = gql`
  subscription KIOSCO_pagoQrConfirmacion($transaccionID: String!) {
    KIOSCO_pagoQrConfirmacion(transaccionID: $transaccionID) {
      estado
      mensaje
    }
  }
`;

export const PAGO_TARJETA_CONFIRMACION = gql`
  subscription KIOSCO_pagoTarjetaConfirmacion($transaccionID: String!) {
    KIOSCO_pagoTarjetaConfirmacion(transaccionID: $transaccionID) {
      estado
      mensaje
    }
  }
`;
