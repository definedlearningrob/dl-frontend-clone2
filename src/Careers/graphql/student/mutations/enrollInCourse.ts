import { gql } from '@apollo/client';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  mutation EnrollInCourse($input: EnrollInCourseMutationInput!) {
    enrollInCourse(input: $input) {
      course {
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
      }
    }
  }
`;

export type EnrollInCourseData = {
  enrollInCourse: {
    course: {
      id: string;
      imageUrl: string;
      name: string;
      progress: {
        submitted: number;
        total: number;
      };
      status: ContentStatusesTypes;
      patway: {
        name: string;
      };
    };
  };
};

export type EnrollInCourseVariables = {
  input: EnrollInCourseMutationInput;
};

type EnrollInCourseMutationInput = {
  courseId: string;
};
