import { gql, TypedDocumentNode } from '@apollo/client';

import { TInstitution } from '@dc/resources/types';
import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

export const STUDENT_APPLICATIONS_QUERY: TypedDocumentNode<StudentApplicationsData, null> = gql`
  query StudentApplications($studentUuid: ID!) {
    studentApplications(studentUuid: $studentUuid) {
      forms {
        formType
        status
      }
      institution {
        id
        name
      }
    }
  }
`;

export type StudentApplicationsVariables = {
  studentUuid: string;
};

export type StudentApplicationsData = {
  studentApplications: StudentApplication[];
};

export type StudentApplication = {
  forms: {
    formType: COMMON_APP_FORM_TYPES;
    status: COMMON_APP_FORM_STATUS;
  }[];
  institution: Pick<TInstitution, 'id' | 'name'>;
};
