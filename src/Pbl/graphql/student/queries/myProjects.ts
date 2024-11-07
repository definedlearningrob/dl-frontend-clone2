import { gql } from '@apollo/client';

export default gql`
  query StudentMyProjects($page: Int, $perPage: Int) {
    myProjects: myTasks(page: $page, perPage: $perPage) {
      nodes {
        id
        assignedAt
        description
        displayName
        originator {
          firstName
          lastName
        }
        thumbnailUrl
        team {
          id
          name
        }
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
  perPage?: number;
  page?: number;
};

type TProject = {
  id: string;
  assignedAt: string;
  description: string;
  displayName: string;
  originator: {
    firstName: string;
    lastName: string;
  } | null;
  thumbnailUrl: string;
  team: {
    id: string;
    name: string;
  };
};
