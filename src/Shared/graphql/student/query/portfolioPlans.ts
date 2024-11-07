import { gql } from '@apollo/client';

export default gql`
  query PortfolioPlans {
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
  }
`;

export type TPortfolioPlansData = {
  portfolio: {
    plans: TPortfolioPlan[];
    studentId: string;
  };
};

export type TPortfolioPlan = {
  id: string;
  name: string;
  evaluation: {
    id: string;
  };
};
