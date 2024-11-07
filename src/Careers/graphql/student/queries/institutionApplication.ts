import { gql, TypedDocumentNode } from '@apollo/client';

import {
  APPLICATIONS_TYPE,
  APPLICATION_FORM_TYPE,
  INSTITUTION_APPLICATION_STATUS,
  RECOMMENDER_TYPE,
} from '@dc/resources/enums';

export const INSTITUTION_APPLICATION_QUERY: TypedDocumentNode<
  TInstitutionApplicationData,
  TInstitutionApplicationVariables
> = gql`
  query InstitutionApplicationQuery($id: ID!) {
    institutionApplication(id: $id) {
      id
      name
      appliedAt
      type
      institution {
        id
      }
      deadline
      recommenders {
        email
        firstName
        lastName
        type
        formStatuses {
          formType
          downloadedDate
          submittedDate
          status
        }
      }
    }
  }
`;

export type TFormStatuses = {
  formType: APPLICATION_FORM_TYPE;
  downloadedDate: string;
  signedDate: string;
  status: INSTITUTION_APPLICATION_STATUS;
};

export type TRecommender = {
  email: string;
  firstName: string;
  lastName: string;
  type: RECOMMENDER_TYPE;
  formStatuses?: TFormStatuses[];
};

export type InstitutionApplication = {
  id: string;
  name: string;
  type: APPLICATIONS_TYPE;
  institution: {
    id: string;
  };
  status: INSTITUTION_APPLICATION_STATUS;
  appliedAt: string;
  recommenders: TRecommender[];
  deadline: string | null;
  acceptsTeacherRecommendation: boolean;
};

export type TInstitutionApplicationVariables = {
  id: string;
};

export type TInstitutionApplicationData = {
  institutionApplication: InstitutionApplication;
};
