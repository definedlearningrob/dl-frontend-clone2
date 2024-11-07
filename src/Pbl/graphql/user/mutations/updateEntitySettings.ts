import { gql } from '@apollo/client';

export default gql`
  mutation DlUpdateEntitySettings($input: UpdateEntitySettingsMutationInput!) {
    updateEntitySettings(input: $input) {
      entity {
        settings {
          selfEvaluationEnabled
        }
        uuid
      }
    }
  }
`;

type EntitySettingsAttributes = { selfEvaluationEnabled: boolean };

export type TUpdateEntitySettingsMutationData = {
  updateEntitySettings: {
    entity: {
      uuid: string;
      settings: EntitySettingsAttributes;
    };
  };
};

export type TUpdateEntitySettingsMutationVariables = {
  input: {
    settings: EntitySettingsAttributes;
    uuid: string;
  };
};
