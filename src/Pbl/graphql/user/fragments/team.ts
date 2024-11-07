import { gql } from '@apollo/client';

export default gql`
  fragment Team on Team {
    id
    uuid
    name
    isArchived
    students(page: 1, perPage: 1000) {
      nodes {
        currentTasksCount
        firstName
        lastName
        uuid
      }
      nodesCount
      pagesCount
    }
    tasks {
      displayName
      id
    }
  }
`;

type TTask = {
  displayName: string;
  id: string;
};

export type TTeam = {
  id: string;
  uuid: string;
  name: string;
  isArchived: boolean;
  students: TTeamStudents;
  tasks: TTask[];
};

type TTeamStudents = {
  nodes: TTeamStudent[];
  nodesCount: number;
  pagesCount: number;
};

type TTeamStudent = {
  currentTasksCount: number;
  firstName: string;
  lastName: string;
  uuid: string;
};
