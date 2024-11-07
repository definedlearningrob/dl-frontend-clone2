import { gql } from '@apollo/client';

export default gql`
  mutation DeletePortfolioProject($input: DeletePortfolioProjectMutationInput!) {
    deletePortfolioProject(input: $input) {
      status
    }
  }
`;

export type TDeletePortfolioProjectMutationInput = {
  input: {
    id: string;
  };
};

export type TDeletePortfolioProjectData = {
  status: string;
};
