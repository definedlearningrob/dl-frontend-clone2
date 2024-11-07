import { gql } from '@apollo/client';

import { EducationalSettingTypes } from '@dc/resources/enums';

export default gql`
  query StudentCurrentCoursesPreview($uuid: ID!, $studentUuid: ID!) {
    student(uuid: $uuid) {
      archivedAt
      assessmentCompleted
      assessmentResult {
        id
      }
      currentCourses {
        id
        name
        progress {
          total
          submitted
        }
        type
        gradingNeeded(studentUuid: $studentUuid)
      }
      firstName
      hasPlans
      lastName
      schoolClasses {
        uuid
        name
      }
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
      plans {
        id
      }
    }
  }
`;

export type TStudentCurrentCoursesPreviewDataVariable = {
  uuid: string;
  studentUuid: string;
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

export type TSchoolClass = {
  uuid: string;
  name: string;
};

export type TCurrentCourse = {
  id: string;
  name: string;
  progress: {
    total: number;
    submitted: number;
  };
  gradingNeeded: boolean;
};

export type TStudentPlan = {
  id: string;
};

export type TStudent = {
  archivedAt: string;
  assessmentCompleted: boolean;
  assessmentResult: {
    id: string;
  };
  currentCourses: TCurrentCourse[];
  firstName: string;
  hasPlans: boolean;
  lastName: string;
  schoolClasses: TSchoolClass[];
  settings: TSettings;
  uuid: string;
  plans: TStudentPlan[];
};

export type TStudentCurrentCoursesPreviewData = {
  student: TStudent;
};
