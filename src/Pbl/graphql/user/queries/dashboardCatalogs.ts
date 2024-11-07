import { gql } from '@apollo/client';

import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';

export default gql`
  query DashboardCatalogs($page: Int, $perPage: Int) {
    catalogs(page: $page, perPage: $perPage) {
      nodes {
        courses: tracks {
          nodesCount
        }
        tracksCount
        description
        tasksCount
        displayName
        name
        id
        thumbnailUrl
      }
      nodesCount
      pagesCount
    }
  }
`;

type TCourse = {
  nodesCount: number;
};

export type TCourses = {
  nodes: TCourse[];
  nodesCount: number;
  pagesCount: number;
};

export type TCatalogCourses = {
  nodes: TCourses[];
  nodesCount: number;
  pagesCount: number;
};

export type TCatalogs = {
  nodes: TCatalog[];
  nodesCount: number;
  pagesCount: number;
};

export type TDashboardVariables = {
  page: number;
  perPage: number;
};

export type TDashboardCatalogsData = {
  catalogs: TCatalogs;
};
