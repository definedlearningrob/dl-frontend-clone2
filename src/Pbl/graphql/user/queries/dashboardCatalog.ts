import { gql } from '@apollo/client';

import { TRACK_GRADES } from '@shared/resources/constants';
import { ToStringLiteral } from '@shared/utils/types';

export default gql`
  query DashboardCatalog($id: ID!, $page: Int, $perPage: Int) {
    catalog(id: $id) {
      description
      displayName
      id
      name
      tracksCount
      tasksCount
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
      thumbnailUrl
      imageUrl
    }
  }
`;

export type TCatalogCourse = {
  description: string;
  displayName: string;
  tracksCount: number;
  tasksCount: number;
  grades: ToStringLiteral<typeof TRACK_GRADES>[];
  id: string;
  imageUrl: string;
  shortDescription: string;
  thumbnailUrl: string;
};

export type TCatalogCourses = {
  nodes: TCatalogCourse[];
  nodesCount: number;
  pagesCount: number;
};

export type TCatalog = {
  id: string;
  courses: TCatalogCourses;
  thumbnailUrl: string;
  imageUrl: string;
  description: string;
  displayName: string;
  name: string;
  tracksCount: number;
  tasksCount: number;
};

export type TDashboardCatalogVariables = {
  id: string;
  page?: number;
  perPage?: number;
};

export type TDashboardCatalogData = {
  catalog: TCatalog;
};
