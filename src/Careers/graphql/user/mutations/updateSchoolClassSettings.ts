import { gql } from '@apollo/client';

import { EducationalSettingTypes } from '@dc/resources/enums';

export default gql`
  mutation UpdateSchoolClassSettings($input: UpdateSchoolClassSettingsMutationInput!) {
    updateSchoolClassSettings(input: $input) {
      schoolClass {
        settings {
          assessmentType
        }
        students {
          nodes {
            settings {
              assessmentType {
                origin
                value
              }
            }
            uuid
          }
        }
        uuid
      }
    }
  }
`;

export type TSettingsDataVariables = {
  assessmentType: EducationalSettingTypes;
};

export type TUpdateSchoolClassSettingsVariables = {
  uuid: string;
  settings: TSettingsDataVariables;
};

export type TSettingOrigin = 'DEFAULT' | 'INDIVIDUAL' | 'INHERITED';

export type TSchoolClassSettings = {
  assessmentType: EducationalSettingTypes;
};

export type TStudentSettings = {
  assessmentType: {
    origin: TSettingOrigin;
    value: EducationalSettingTypes;
  };
};

export type TStudent = {
  settings: TStudentSettings;
};

export type TSchoolClass = {
  settings: TSchoolClassSettings;
  students: {
    nodes: TStudent[];
  };
  uuid: string;
};

export type TUpdateSchoolClassSettingsData = {
  schoolClass: TSchoolClass;
};
