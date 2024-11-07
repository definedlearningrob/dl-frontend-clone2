import { gql, TypedDocumentNode } from '@apollo/client';

import {
  RECOMMENDER_TYPE,
  INSTITUTION_APPLICATION_STATUS,
  APPLICATIONS_TYPE,
} from '@dc/resources/enums';

export const INSTITUTION_APPLICATIONS: TypedDocumentNode<
  TInstitutionApplicationsData,
  TInstitutionApplicationsVariables
> = gql`
  query InstitutionApplications($page: Int, $perPage: Int) {
    institutionApplications(page: $page, perPage: $perPage) {
      nodes {
        id
        name
        type
        status
        institution {
          commonAppApplicationUrl
          id
          minTeacherEval
          commonAppEnabled
        }
        appliedAt
        acceptsTeacherRecommendation
        recommenders {
          email
          firstName
          lastName
          type
        }
      }
    }
  }
`;

export type InstitutionApplication = {
  id: string;
  name: string;
  type: APPLICATIONS_TYPE;
  deadline: string | null;
  institution: {
    id: string;
    commonAppApplicationUrl: string | null;
    minTeacherEval: number | null;
    commonAppEnabled: boolean;
  };
  status: INSTITUTION_APPLICATION_STATUS;
  appliedAt: string;
  recommenders: TRecommender[];
  acceptsTeacherRecommendation: boolean;
};

type InstitutionApplications = {
  nodes: InstitutionApplication[];
};

export type TRecommender = {
  email: string;
  firstName: string;
  lastName: string;
  type: RECOMMENDER_TYPE;
};

export type TInstitutionApplicationsData = {
  institutionApplications: InstitutionApplications;
};

export type TInstitutionApplicationsVariables = {
  page?: number;
  perPage?: number;
};
