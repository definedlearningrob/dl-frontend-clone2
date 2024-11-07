import { gql } from '@apollo/client';

import { PUBLISHING_STATUSES } from '@dc/resources/constants';

export default gql`
  query CourseOptions($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: CourseFilter) {
    courses(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        id
        imageUrl
        thumbnailUrl
        name
      }
    }
  }
`;

export type TCourseOptionsData = {
  courses: {
    pagesCount: number;
    nodesCount: number;
    nodes: TCourseOption[];
  };
};

export type TCourseOption = {
  name: string;
  id: string;
};

export type TCourseOptionsVariables = {
  filter: { nameCont: string; statusEq: keyof typeof PUBLISHING_STATUSES };
};
