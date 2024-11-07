import { gql } from '@apollo/client';

export default gql`
  mutation updateSchoolYearStartDate($input: UpdateEntitySettingsMutationInput!) {
    updateEntitySettings(input: $input) {
      entity {
        settings {
          schoolYearStartDate {
            day
            month
          }
        }
        uuid
      }
    }
  }
`;

export type TSchoolYearStartDate = {
  value: {
    day: number;
    month: number;
  };
};

export type TUpdateEntitySettingsVariables = {
  input: {
    uuid: string;
    settings: TSettings;
  };
};

export type TSettings = {
  schoolYearStartDate?: TSchoolYearStartDate;
};

export type TUpdateEntitySettingsData = {
  entity: {
    settings: TSettings;
    uuid: string;
  };
};
