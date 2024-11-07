import { gql } from '@apollo/client';

export default gql`
  query StudentPortfolioPlans($uuid: ID!) {
    student(uuid: $uuid) {
      portfolio {
        plans {
          id
          name
          evaluation {
            id
          }
        }
        studentId
      }
      uuid
      firstName
      lastName
      email
      username
    }
  }
`;

export type TStudentPortfolioPlansData = {
  student: {
    portfolio: {
      plans: TStudentPortfolioPlan[];
      studentId: string;
    };
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
};

export type TStudentPortfolioPlan = {
  id: string;
  name: string;
  evaluation: {
    id: string;
  };
};

export type TStudentPortfolioPlansVariables = {
  uuid: string;
};
