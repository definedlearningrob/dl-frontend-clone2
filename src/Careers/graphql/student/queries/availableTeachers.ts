import { gql, TypedDocumentNode } from '@apollo/client';

import { AvailableTeacher } from '@dc/components/Student/ApplicationsManagement/types';

export const AVAILABLE_TEACHERS_QUERY: TypedDocumentNode<TAvailableTeachersData, null> = gql`
  query AvailableTeachers {
    availableTeachers(perPage: 1000) {
      nodes {
        email
        fullName
        name
        username
        uuid
      }
    }
  }
`;

export type TAvailableTeachersData = {
  availableTeachers: {
    nodes: AvailableTeacher[];
  };
};
