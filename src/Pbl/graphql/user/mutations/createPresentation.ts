import { gql } from '@apollo/client';

export default gql`
  mutation CreatePresentation($input: CreatePresentationMutationInput!) {
    createPresentation(input: $input) {
      presentation {
        id
        name
      }
    }
  }
`;
export type TCreatePresentationData = {
  createPresentation: {
    presentation: {
      id: string;
      name: string;
    };
  };
};

export type TCreatePresentationVariables = {
  input: {
    name: string;
    description: string;
    status: 'PUBLISHED';
  };
};
