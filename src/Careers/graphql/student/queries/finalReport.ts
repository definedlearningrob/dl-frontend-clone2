import { gql } from '@apollo/client';

import FINAL_REPORT_COURSE from '@dc/graphql/shared/fragments/finalReportCourse';

gql`
  query FinalReport($track: Boolean) {
    finalReport(track: $track) {
      additionalPathways {
        id
        name
        imageUrl
        description
      }
      recommendedCourses {
        id
        name
        description
        pathway {
          id
          name
          cluster {
            id
            name
          }
        }
      }
      recommendedPathways {
        id
        name
        imageUrl
        description
      }
      assessmentAttempt {
        id
        updatedAt
      }
      currentCourses {
        ...FinalReportCourse
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
      interestsResult {
        interest
        score
      }
    }
    userInfo {
      firstName
      lastName
    }
  }
  ${FINAL_REPORT_COURSE}
`;
