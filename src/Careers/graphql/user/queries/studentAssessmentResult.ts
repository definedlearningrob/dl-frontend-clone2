import { gql } from '@apollo/client';

export default gql`
  query StudentAssessmentResult($uuid: ID!) {
    student(uuid: $uuid) {
      uuid
      assessmentResult {
        additionalPathways {
          name
          description
        }
        interestsResult {
          interest
          score
        }
        recommendedPathways {
          name
          description
        }
        studyPreferencesResult {
          area
          description
          position
        }
        workValuesResult {
          score
          workValue
        }
      }
      uuid
    }
  }
`;
