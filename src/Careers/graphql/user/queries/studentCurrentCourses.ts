import { gql } from '@apollo/client';

export default gql`
  query StudentCurrentCourses($uuid: ID!) {
    student(uuid: $uuid) {
      assessmentCompleted
      uuid
      currentCourses {
        id
        imageUrl
        name
        progress {
          submitted
          total
        }
        status
        pathway {
          name
        }
        thumbnailUrl
      }
    }
  }
`;

export type TStudentCurrentCoursesVariables = {
  uuid: string;
};

export type TCourse = {
  id: string;
  imageUrl: string;
  name: string;
  progress: {
    submitted: number;
    total: number;
  };
  status: string;
  pathway: TPathway;
  thumbnailUrl: string;
};

export type TPathway = {
  name: string;
};

export type TStudent = {
  assessmentCompleted: boolean;
  uuid: string;
  currentCourses: TCourse[];
};

export type TStudentCurrentCoursesData = {
  student: TStudent;
};
