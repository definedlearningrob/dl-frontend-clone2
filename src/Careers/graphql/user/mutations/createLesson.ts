import { gql } from '@apollo/client';

export default gql`
  mutation CreateLesson($input: CreateLessonMutationInput!) {
    createLesson(input: $input) {
      lesson {
        id
        imageUrl
        name
      }
    }
  }
`;
