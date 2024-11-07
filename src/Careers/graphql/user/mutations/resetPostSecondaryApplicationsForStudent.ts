import { gql, TypedDocumentNode } from '@apollo/client';

export const RESET_POST_SECONDARY_APPLICATIONS_FOR_STUDENT_MUTATION: TypedDocumentNode<
  TResetPostSecondaryApplicationsForStudentData,
  TResetPostSecondaryApplicationsForStudentVariables
> = gql`
  mutation ResetPostSecondaryApplicationsForStudents(
    $input: ResetPostSecondaryApplicationsForStudentMutationInput!
  ) {
    resetPostSecondaryApplicationsForStudent(input: $input) {
      student {
        uuid
        postSecondaryApplicationsStatus {
          isEnabled
          isOverridden
        }
      }
    }
  }
`;

type TResetPostSecondaryApplicationsForStudentData = {
  resetPostSecondaryApplicationsForStudent: {
    student: {
      uuid: string;
      postSecondaryApplicationsStatus: {
        isEnabled: boolean;
        isOverridden: boolean;
      };
    };
  };
};

type TResetPostSecondaryApplicationsForStudentVariables = {
  input: {
    studentUuid: string;
  };
};
