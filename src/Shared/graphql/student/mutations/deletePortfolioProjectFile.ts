import { gql } from '@apollo/client';

export default gql`
  mutation DeletePortfolioProjectFile($input: DeletePortfolioProjectFileMutationInput!) {
    deletePortfolioProjectFile(input: $input) {
      status
    }
  }
`;

export type TDeletePortfolioProjectFileMutationInput = {
  input: {
    id: string;
  };
};

export type TDeletePortfolioProjectFileData = {
  status: string;
};
