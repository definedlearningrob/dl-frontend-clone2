import { gql } from '@apollo/client';

import { EducationalSettingTypes } from '@dc/resources/enums';

export default gql`
  query DcStudent($uuid: ID!) {
    student(uuid: $uuid) {
      currentCourses {
        id
        name
        progress {
          total
          submitted
        }
      }
      email
      entity {
        name
        uuid
      }
      firstName
      lastName
      settings {
        assessmentEnabled {
          origin
          value
        }
        assessmentType {
          origin
          value
        }
        onboardingEnabled {
          origin
          value
        }
        selfEvaluationEnabled {
          origin
          value
        }
      }
      uuid
    }
  }
`;

export type TCurrentCourse = {
  id: string;
  name: string;
  progress: {
    total: number;
    submitted: number;
  };
};

export type TEntity = {
  name: string;
  uuid: string;
};

export type TSettingOrigin = 'DEFAULT' | 'INDIVIDUAL' | 'INHERITED';

export type TSettings = {
  assessmentEnabled: {
    origin: TSettingOrigin;
    value: boolean;
  };
  assessmentType: {
    origin: TSettingOrigin;
    value: EducationalSettingTypes;
  };
  onboardingEnabled: {
    origin: TSettingOrigin;
    value: boolean;
  };
  selfEvaluationEnabled: {
    origin: TSettingOrigin;
    value: boolean;
  };
};

export type TStudent = {
  currentCourses: TCurrentCourse[];
  email: string;
  entity: TEntity;
  firstName: string;
  lastName: string;
  settings: TSettings;
  uuid: string;
};

export type TStudentData = {
  student: TStudent;
};
