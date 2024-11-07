import { gql } from '@apollo/client';

gql`
  query AcademyCourses {
    academyCourses {
      id
      name
      category
      startDate
      endDate
      description
      progress {
        completed
        total
      }
    }
  }
`;
