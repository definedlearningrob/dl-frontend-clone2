import { gql } from '@apollo/client';

export default gql`
  query ExtensionCourses(
    $scope: ArchivableStatus
    $page: Int
    $perPage: Int
    $filter: CourseFilter
  ) {
    courses(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        id
        name
      }
    }
  }
`;

export type TUserCourse = {
  id: string;
  name: string;
};

export type TUserCourses = {
  nodesCount: number;
  pagesCount: number;
  nodes: TUserCourse[];
};

export type TExtensionCoursesData = {
  courses: {
    pagesCount: number;
    nodesCount: number;
    nodes: TUserCourse[];
  };
};

export type TExtensionCoursesVariables = {
  perPage: number;
  page: number;
  filter: {
    nameCont: string;
  };
};
