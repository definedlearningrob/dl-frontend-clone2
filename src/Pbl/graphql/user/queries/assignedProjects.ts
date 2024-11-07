import { gql } from '@apollo/client';

import { ContentStatusesTypes } from '@dc/resources/enums';

export default gql`
  query AssignedProjects($page: Int, $perPage: Int) {
    assignedProjects: assignedTasks(page: $page, perPage: $perPage) {
      nodes {
        id
        displayName
        name
        assignedAt
        status
        gradingNeeded
        owner {
          uuid
        }
        isArchived
        isAssignedByUser
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TAssignedProjectsData = {
  assignedProjects: {
    nodesCount: number;
    pagesCount: number;
    nodes: TProject[];
  };
};

export type TAssignedProjectVariables = {
  perPage: number;
  page: number;
};

export type TOwner = {
  uuid: string;
};

export type TProject = {
  id: string;
  createdAt: string;
  displayName: string;
  gradingNeeded: boolean;
  name: string;
  assignedAt: string;
  status: ContentStatusesTypes;
  owner: TOwner | null;
  isArchived: boolean;
  isAssignedByUser: boolean;
};
