import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation KIOSCO_login($login: KioscoLogin!) {
    KIOSCO_login(login: $login) {
      id
      negocio
      tipoNegocio
      token
    }
  }
`;

export const CREAR_ORDEN = gql`
  mutation KIOSCO_crearOrden($orden: OrdenInput!, $fecha: String!) {
    KIOSCO_crearOrden(orden: $orden, fecha: $fecha) {
      id
      comandaId
      ticketPdf
    }
  }
`;

export const FACTURAR_ORDEN = gql`
  mutation ($ordenFacturaInfo: OrdenFacturaInfoInput!) {
    KIOSCO_facturarOrden(ordenFacturaInfo: $ordenFacturaInfo) {
      facturaPdf
    }
  }
`;

// crearOrden({
//   variables: {
//     orden: ordenVariables,
//     fecha: new Date().toISOString(),
//   },
// }).then();
