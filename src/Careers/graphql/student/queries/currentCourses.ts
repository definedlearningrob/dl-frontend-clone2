import { gql } from '@apollo/client';

import { CourseType } from '@dc/resources/enums';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query CurrentCourses {
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
      type
    }
  }
`;

export type TCurrentCourse = {
  id: string;
  imageUrl: string;
  name: string;
  progress: {
    total: number;
    submitted: number;
  };
  status: ContentStatusesTypes;
  pathway: {
    name: string;
  };
  thumbnailUrl: string;
  type: CourseType;
};

export type TCurrentCoursesData = {
  currentCourses: TCurrentCourse[];
};
