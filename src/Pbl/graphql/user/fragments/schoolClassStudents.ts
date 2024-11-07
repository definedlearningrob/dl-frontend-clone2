import { gql } from '@apollo/client';

export default gql`
  fragment Students on SchoolClass {
    students(page: 1, perPage: 1000) {
      nodes {
        currentTasksCount
        firstName
        lastName
        uuid
        hasPlans
        plans {
          id
        }
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TStudentPlan = {
  id: string;
};

export type TStudents = {
  nodes: TStudent[];
  nodesCount: number;
  pagesCount: number;
};

export type TStudent = {
  currentTasksCount: number;
  firstName: string;
  lastName: string;
  uuid: string;
  hasPlans: boolean;
  plans: TStudentPlan[];
};
