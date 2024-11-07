import { gql, TypedDocumentNode } from '@apollo/client';

import { INSTITUTION_APPLICATION_STATUS } from '@dc/resources/enums';

export const UPDATE_INSTITUTION_APPLICATION: TypedDocumentNode<
  TUpdateInstitutionApplicationData,
  TUpdateInstitutionApplicationVariables
> = gql`
  mutation UpdateInstitution($input: UpdateInstitutionApplicationMutationInput!) {
    updateInstitutionApplication(input: $input) {
      institutionApplication {
        status
        name
      }
    }
  }
`;

type TInstitutionApplicationStatus = keyof typeof INSTITUTION_APPLICATION_STATUS;

export type TUpdateInstitutionApplicationData = {
  institutionApplication: {
    status: TInstitutionApplicationStatus;
    id: string;
  };
};

export type TUpdateInstitutionApplicationVariables = {
  input: {
    status: TInstitutionApplicationStatus;
    institutionApplicationId: string;
  };
};
