import { gql } from '@apollo/client';

export default gql`
  query UserMyClasses($filter: SchoolClassFilter, $page: Int, $perPage: Int) {
    schoolClasses(filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        isDemo
        name
        currentTasksCount
        students {
          nodesCount
        }
        uuid
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TMyClassesData = {
  schoolClasses: {
    nodesCount: number;
    pagesCount: number;
    nodes: TSchoolClass[];
  };
};

export type TMyClassesVariables = {
  filter?: {
    nameCont: string;
  };
  perPage?: number;
  page?: number;
};

type TSchoolClass = {
  name: string;
  currentTasksCount: number;
  students: {
    nodesCount: number;
  };
  uuid: string;
};
