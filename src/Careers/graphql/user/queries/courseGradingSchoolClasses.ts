import { gql } from '@apollo/client';

export default gql`
  query CourseGradingSchoolClasses($id: ID!) {
    course(id: $id) {
      gradingNeededSchoolClasses: enrolledSchoolClasses(gradingNeeded: true) {
        nodes {
          name
          parentName
          settings {
            assessmentType
          }
          uuid
        }
      }
      id
      name
      withoutGradingNeededSchoolClasses: enrolledSchoolClasses(gradingNeeded: false) {
        nodes {
          name
          parentName
          settings {
            assessmentType
          }
          uuid
        }
      }
    }
  }
`;
