import { TypedDocumentNode, gql } from '@apollo/client';

export const DELETE_INSTITUTION_APPLICATION: TypedDocumentNode<
  TDeleteInstitutionApplicationData,
  TDeleteInstitutionApplicationVariables
> = gql`
  mutation DeleteInstitutionApplication($input: DeleteInstitutionApplicationMutationInput!) {
    deleteInstitutionApplication(input: $input) {
      status
    }
  }
`;

export type TDeleteInstitutionApplicationVariables = {
  input: {
    institutionApplicationId: string;
  };
};

export type TDeleteInstitutionApplicationData = {
  deleteInstitutionApplication: {
    status: string;
  };
};
