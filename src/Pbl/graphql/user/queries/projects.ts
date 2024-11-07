import { gql } from '@apollo/client';

import { TASK_STATUS } from '@pbl/resources/enums';

export default gql`
  query Projects($filter: TaskFilter, $page: Int, $perPage: Int, $teamId: ID!) {
    projects: tasks(filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        id
        displayName
        isAssignedToTeam(teamId: $teamId)
      }
      pagesCount
    }
  }
`;

export type TProjectsVariables = {
  teamId: string;
  filter?: TaskFilter;
  page?: number;
  perPage?: number;
  infiniteScroll?: boolean;
};

export type TaskFilter = {
  displayNameCont?: string;
  statusEq?: TASK_STATUS;
};

export type TProjectsData = {
  projects: {
    nodes: {
      id: string;
      displayName: string;
      isAssignedToTeam: boolean;
    }[];
    pagesCount: number;
  };
};
