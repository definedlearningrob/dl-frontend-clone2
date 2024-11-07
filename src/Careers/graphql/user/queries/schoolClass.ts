import { gql } from '@apollo/client';

import { EducationalSettingTypes } from '@dc/resources/enums';

export default gql`
  query DcSchoolClass($uuid: ID!) {
    schoolClass(uuid: $uuid) {
      isDemo
      name
      uuid
      entity {
        name
        uuid
      }
      settings {
        assessmentType
      }
    }
  }
`;

export type TSchoolClassVariables = {
  uuid: string;
};

export type TSettings = {
  assessmentType: EducationalSettingTypes;
};

export type TEntity = {
  name: string;
  uuid: string;
};

export type TSchoolClass = {
  isDemo: boolean;
  name: string;
  uuid: string;
  entity: TEntity;
  settings: TSettings;
};

export type TSchoolClassData = {
  schoolClass: TSchoolClass;
};
