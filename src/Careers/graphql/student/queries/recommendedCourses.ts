import { gql } from '@apollo/client';

export default gql`
  query RecommendedCourses {
    recommendedCourses {
      id
      imageUrl
      match
      name
      pathway {
        name
      }
      thumbnailUrl
      type
      collection {
        id
        name
      }
      metadata {
        alternativeTitles
        averageSalary
        jobZone
        onetCode
        outlook
      }
    }
  }
`;
