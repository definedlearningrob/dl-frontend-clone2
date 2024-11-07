import { gql } from '@apollo/client';

import { TRACK_GRADES } from '@shared/resources/constants';
import { ToStringLiteral } from '@shared/utils/types';

export default gql`
  query DashboardCourses($page: Int, $perPage: Int) {
    courses: tracks(page: $page, perPage: $perPage) {
      nodes {
        tasksCount
        description
        displayName
        grades
        id
        imageUrl
        shortDescription
        thumbnailUrl
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TGrade = ToStringLiteral<typeof TRACK_GRADES>;

export type TDashboardCoursesData = {
  courses: TDashboardCoursesTracks;
};

export type TDashboardCoursesVariables = {
  page?: number;
  perPage?: number;
};

export type TDashboardCoursesTracks = {
  nodes: TDashboardCoursesTrack[];
  nodesCount: number;
  pagesCount: number;
};

export type TDashboardCoursesTrack = {
  tasksCount: number;
  description: string;
  grades: TGrade[];
  displayName: string;
  id: string;
  imageUrl: string;
  shortDescription: string;
  thumbnailUrl: string;
};
