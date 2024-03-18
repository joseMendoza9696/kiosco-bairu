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
