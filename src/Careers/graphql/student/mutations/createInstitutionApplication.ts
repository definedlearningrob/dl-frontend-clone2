import { TypedDocumentNode, gql } from '@apollo/client';

export const CREATE_INSTITUTION_APPLICATION: TypedDocumentNode<
  TCreateInstitutionApplicationData,
  TCreateInstitutionApplicationVariables
> = gql`
  mutation CreateInstitutionApplication($input: CreateInstitutionApplicationMutationInput!) {
    createInstitutionApplication(input: $input) {
      institutionApplication {
        id
        name
      }
    }
  }
`;

export type TCreateInstitutionApplicationVariables = {
  input: {
    institutionId: string;
  };
};

export type TCreateInstitutionApplicationData = {
  createInstitutionApplication: {
    institutionApplication: {
      id: string;
      name: string;
    };
  };
};
