import { gql, TypedDocumentNode } from '@apollo/client';

export const ASSIGN_STUDENTS_TO_COUNSELOR: TypedDocumentNode<
  TAssignStudentsToCounselorData,
  TAssignStudentsToCounselorVariables
> = gql`
  mutation AssignStudentsToCounselor($input: AssignStudentsToCounselorMutationInput!) {
    assignStudentsToCounselor(input: $input) {
      students {
        uuid
        counselor {
          uuid
          fullName
        }
      }
    }
  }
`;

type TAssignStudentsToCounselorData = {
  assignStudentsToCounselor: {
    students: {
      uuid: string;
      counselor: {
        uuid: string;
        fullName: string;
      };
    };
  };
};

type TAssignStudentsToCounselorVariables = {
  input: {
    studentUuids: string[];
  };
};
