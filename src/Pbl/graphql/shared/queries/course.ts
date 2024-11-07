import { gql } from '@apollo/client';

import COURSE_DETAILS_FIELDS, { TCourseData } from '@pbl/graphql/fragments/course';

export default gql`
  ${COURSE_DETAILS_FIELDS}
  query CourseDetails($projectId: ID!, $courseId: ID!) {
    project: task(id: $projectId) {
      course(id: $courseId) {
        ...CourseDetails
      }
    }
  }
`;

export type TCourseDetailsData = {
  project: {
    course: TCourseData;
  };
};

export type TCourseDetailsVariables = {
  projectId: string;
  courseId: string;
};
