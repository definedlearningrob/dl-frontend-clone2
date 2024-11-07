import { gql } from '@apollo/client';

import FINAL_REPORT_COURSE from '@dc/graphql/shared/fragments/finalReportCourse';

gql`
  query StudentFinalReport($uuid: ID!, $track: Boolean) {
    student(uuid: $uuid) {
      finalReport(track: $track) {
        additionalPathways {
          description
          id
          imageUrl
          name
        }
        assessmentAttempt {
          id
          updatedAt
        }
        currentCourses {
          ...FinalReportCourse
        }
        interestsResult {
          interest
          score
        }
        recommendedCourses {
          description
          id
          name
          pathway {
            cluster {
              id
              name
            }
            id
            name
          }
        }
        recommendedPathways {
          id
          name
          imageUrl
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
      firstName
      lastName
      uuid
    }
  }
  ${FINAL_REPORT_COURSE}
`;
