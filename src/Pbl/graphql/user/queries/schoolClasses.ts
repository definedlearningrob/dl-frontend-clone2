import { gql } from '@apollo/client';

const MAX_CLASSES_PER_PAGE = 1024;
const MAX_STUDENTS_PER_CLASS = 256;

export default gql`
  query SchoolClasses($filter: SchoolClassFilter, $page: Int, $projectId: ID!) {
    schoolClasses(filter: $filter, page: $page, perPage: ${MAX_CLASSES_PER_PAGE}) {
      nodes {
        isDemo,
        name,
        students(perPage: ${MAX_STUDENTS_PER_CLASS}) {
          nodes {
            firstName,
            isAssignedToTask(taskId: $projectId),
            lastName,
            uuid,
          },
        },
        teams {
          name,
          students {
            nodes {
              firstName,
              isAssignedToTask(taskId: $projectId),
              lastName,
              uuid,
            },
          },
          tasks {
            id,
            name,
          },
          uuid,
        },
        uuid,
      },
      nodesCount,
      pagesCount
    }
  }
`;

export type TTeam = {
  name: string;
  students: {
    nodes: TSchoolClassStudent[];
  };
  tasks: {
    id: string;
    name: string;
  }[];
  uuid: string;
};

export type TSchoolClassesData = {
  schoolClasses: {
    nodesCount: number;
    pagesCount: number;
    nodes: TSchoolClass[];
  };
};

export type TSchoolClassesVariables = {
  filter?: {
    nameCont: string;
  };
  perPage?: number;
  page?: number;
  projectId: string;
};

export type TSchoolClass = {
  isDemo: boolean;
  name: string;
  students: {
    nodes: TSchoolClassStudent[];
  };
  teams: TTeam[];
  uuid: string;
};

export type TSchoolClassStudent = {
  firstName: string;
  isAssignedToTask: boolean;
  lastName: string;
  uuid: string;
};
