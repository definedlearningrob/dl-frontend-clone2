import { gql } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query Tasks(
    $scope: ArchivableStatus
    $filter: TaskFilter
    $page: Int
    $perPage: Int
    $withCopies: Boolean
  ) {
    tasks(scope: $scope, filter: $filter, page: $page, perPage: $perPage, withCopies: $withCopies) {
      nodes {
        archivedAt
        id
        imageUrl
        name
        owner {
          name
          uuid
        }
        status
        thumbnailUrl
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TTask = {
  archivedAt: string;
  id: string;
  imageUrl: string;
  name: string;
  owner: {
    name: string;
    uuid: string;
  };
  status: ContentStatusesTypes;
  thumbnailUrl: string;
};

export type TTasks = {
  nodes: TTask[];
  nodesCount: number;
  pagesCount: number;
};

export type TTasksFilterDetails = {
  nameCont: string;
  statusEq: ContentStatusesTypes;
};

export type TTasksVariables = {
  scope: ArchivableStatusTypes;
  filter: TTasksFilterDetails;
  page: number;
  perPage: number;
  withCopies: boolean;
};

export type TTasksData = {
  tasks: TTasks;
};
