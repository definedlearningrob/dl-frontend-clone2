import { gql, TypedDocumentNode } from '@apollo/client';

export const TOGGLE_POST_SECONDARY_APPLICATIONS_FOR_STUDENTS_MUTATION: TypedDocumentNode<
  TTogglePostSecondaryApplicationsForStudentsData,
  TTogglePostSecondaryApplicationsForStudentsVariables
> = gql`
  mutation TogglePostSecondaryApplicationsForStudents(
    $input: TogglePostSecondaryApplicationsForStudentsMutationInput!
  ) {
    togglePostSecondaryApplicationsForStudents(input: $input) {
      students {
        uuid
        postSecondaryApplicationsStatus {
          isEnabled
          isOverridden
        }
      }
    }
  }
`;

type TTogglePostSecondaryApplicationsForStudentsData = {
  togglePostSecondaryApplicationsForStudents: {
    students: {
      uuid: string;
      postSecondaryApplicationsStatus: {
        isEnabled: boolean;
        isOverridden: boolean;
      };
    }[];
  };
};

type TTogglePostSecondaryApplicationsForStudentsVariables = {
  input: {
    studentUuids: string[];
    value: boolean;
  };
};
