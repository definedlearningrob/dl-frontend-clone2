import { gql } from '@apollo/client';

export default gql`
  query StudentAssesmentCourse($id: ID!, $track: Boolean) {
    course(id: $id, track: $track) {
      id
      imageUrl
      thumbnailUrl
    }
  }
`;

export type TCourse = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  thumbnailUrl: string;
};

export type TCourseVariables = {
  id: string;
  track: boolean;
};

export type TCourseData = {
  course: TCourse;
};
