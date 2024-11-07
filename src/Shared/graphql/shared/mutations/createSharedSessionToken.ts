import { gql } from '@apollo/client';

export default gql`
  mutation CreateSharedSessionToken($input: CreateSharedSessionTokenMutationInput!) {
    createSharedSessionToken(input: $input) {
      token
    }
  }
`;

export type TCreateSharedSessionToken = {
  createSharedSessionToken: {
    token: string;
  };
};
