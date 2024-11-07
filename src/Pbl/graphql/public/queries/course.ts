import { gql } from '@apollo/client';

import COURSE_DETAILS_FIELDS, { TCourseData } from '@pbl/graphql/fragments/course';

export default gql`
  ${COURSE_DETAILS_FIELDS}
  query PublicCourseDetails($shareId: ID!, $code: String!, $courseId: ID!) {
    project: task(shareId: $shareId, code: $code) {
      course(id: $courseId) {
        exploreMoreAvailable
        ...CourseDetails
      }
    }
  }
`;

export type TCourseDetailsData = {
  project: {
    course: TCourseData & {
      exploreMoreAvailable: boolean;
    };
  };
};

export type TCourseDetailsVariables = {
  shareId: string;
  code: string;
  courseId: string;
};
