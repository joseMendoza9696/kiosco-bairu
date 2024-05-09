import { gql } from '@apollo/client';

export const GET_QR = gql`
  query KIOSCO_getPagoQR($pedido: PedidoQRInput!) {
    KIOSCO_getPagoQR(pedido: $pedido) {
      imagen
      transaccionID
    }
  }
`;

export const GET_INFO_KIOSCO = gql`
  query {
    KIOSCO_getInfoKiosco {
      nombre
      pago_tarjeta_info {
        empresa
        ipLocal
      }
    }
  }
`;

export const PROFILE_QUERY = gql`
  query {
    KIOSCO_getPerfilActivo {
      id
      pago_efectivo
      pago_tarjeta
      pago_qr
      contextStyle {
        colors {
          primary
          secondary
          tertiary
          quartiary
        }
        logo
      }
    }
  }
`;

export const GET_MENU = gql`
  query {
    KIOSCO_getMenu {
      categorias {
        id
        nombre
        imagen
        subcategorias {
          id
          nombre
          imagen
          productos {
            id
            idSistema
            nombre
            imagen
            precio
            descripcion
            opcionesMenu {
              id
              idSistema
              nombre
              seleccion
              cantidadSeleccion
              obligatorio
              opciones {
                id
                idSistema
                nombre
                imagen
                precio
              }
            }
          }
        }
      }
    }
  }
`;
