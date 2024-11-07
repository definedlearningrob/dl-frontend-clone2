import { gql, TypedDocumentNode } from '@apollo/client';

import { Counselor } from '@dc/components/Student/ApplicationsManagement/types';

export const AVAILABLE_COUNSELORS_QUERY: TypedDocumentNode<TAvailableCounselorsData, null> = gql`
  query AvailableCounselors {
    availableCounselors {
      email
      firstName
      fullName
      lastName
      name
      username
      uuid
    }
  }
`;

export type TAvailableCounselorsData = {
  availableCounselors: Counselor[];
};
