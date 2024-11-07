import { gql } from '@apollo/client';

export default gql`
  mutation DcUpdateEntitySettings($input: UpdateEntitySettingsMutationInput!) {
    updateEntitySettings(input: $input) {
      entity {
        settings {
          assessmentEnabled
          assessmentType
          onboardingEnabled
          opportunitiesEnabled
          postSecondaryApplicationsEnabled
          classManagementEnabled
          selfEvaluationEnabled
        }
        schoolClasses {
          nodes {
            settings {
              assessmentType
            }
            students {
              nodes {
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
                }
                uuid
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
