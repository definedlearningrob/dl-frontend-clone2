import { gql } from '@apollo/client';

import { EducationalSettingTypes } from '@dc/resources/enums';

export default gql`
  mutation UpdateStudentSettings($input: UpdateStudentSettingsMutationInput!) {
    updateStudentSettings(input: $input) {
      student {
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
  }
`;

export type TSettingsDataVariables = {
  assessmentEnabled: boolean;
  assessmentType: EducationalSettingTypes;
  onboardingEnabled: boolean;
  selfEvaluationEnabled: boolean;
};

export type TUpdateStudentSettingsDataVariables = {
  uuid: string;
  settings: TSettingsDataVariables;
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
  firstName: string;
  lastName: string;
  settings: TSettings;
  uuid: string;
};

export type TUpdateStudentSettingsData = {
  student: TStudent;
};
