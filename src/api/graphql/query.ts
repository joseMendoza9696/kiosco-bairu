import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
  query {
    KIOSCO_getPerfilActivo {
      id
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
