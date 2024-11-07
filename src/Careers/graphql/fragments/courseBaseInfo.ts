import { gql } from '@apollo/client';

export default gql`
  fragment CourseBaseInfo on Course {
    id
    description
    imageUrl
    name
  }
`;

export type TCourseBaseInfo = {
  id: string;
  description: string | null;
  imageUrl: string;
  name: string;
};
