import { gql } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';

export default gql`
  query Lessons($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: LessonFilter) {
    lessons(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        id
        imageUrl
        name
        thumbnailUrl
        type
      }
    }
  }
`;

export type TLesson = {
  archivedAt: string;
  id: string;
  imageUrl: string;
  name: string;
  thumbnailUrl: string;
  type: string;
};

export type TLessons = {
  nodesCount: number;
  pagesCount: number;
  nodes: TLesson[];
};

export type TLessonsFilter = {
  nameCont: string;
  typeEq: string;
};

export type TLessonsVariables = {
  scope: ArchivableStatusTypes;
  page: number;
  perPage: number;
  filter: TLessonsFilter;
};

export type TLessonsData = {
  lesson: TLessons;
};
