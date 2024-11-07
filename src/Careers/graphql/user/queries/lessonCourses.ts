import { gql } from '@apollo/client';

export default gql`
  query LessonCourses($id: ID!) {
    lesson(id: $id) {
      courses {
        id
        name
      }
    }
  }
`;
