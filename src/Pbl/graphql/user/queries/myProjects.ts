import { gql } from '@apollo/client';

import { ArchivableStatusTypes } from '@pbl/resources/enums';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query UserMyProjects($scope: ArchivableStatus, $page: Int, $perPage: Int) {
    myProjects: myTasks(scope: $scope, page: $page, perPage: $perPage) {
      nodes {
        id
        createdAt
        updatedAt
        displayName
        gradingNeeded
        name
        status
        description
        owner {
          uuid
        }
        isArchived
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TMyProjectsData = {
  myProjects: {
    nodesCount: number;
    pagesCount: number;
    nodes: TProject[];
  };
};

export type TMyProjectsVariables = {
  perPage: number;
  page: number;
  scope: ArchivableStatusTypes;
};

export type TProject = {
  id: string;
  createdAt: string;
  gradingNeeded: boolean;
  updatedAt: string;
  description: string;
  displayName: string;
  name: string;
  status: ContentStatusesTypes;
  owner: {
    uuid: string;
  };
  isArchived: boolean;
};
