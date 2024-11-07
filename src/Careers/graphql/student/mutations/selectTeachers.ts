import { gql, TypedDocumentNode } from '@apollo/client';

import { AvailableTeacher } from '@dc/components/Student/ApplicationsManagement/types';

export const SELECT_TEACHER: TypedDocumentNode<TSelectTeacherData, TSelectTeacherVariables> = gql`
  mutation SelectTeachers($input: SelectTeachersMutationInput!) {
    selectTeachers(input: $input) {
      teachers {
        email
        fullName
        name
        username
        uuid
      }
    }
  }
`;

export type TSelectTeacherData = {
  selectTeachers: {
    teachers: AvailableTeacher[];
  };
};

export type TSelectTeacherVariables = {
  input: {
    userUuids: string[];
    institutionId: number;
  };
};
