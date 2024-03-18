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
