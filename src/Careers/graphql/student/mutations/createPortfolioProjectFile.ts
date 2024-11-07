import { gql } from '@apollo/client';

export default gql`
  mutation CreatePortfolioProjectFile($input: CreatePortfolioProjectFileMutationInput!) {
    createPortfolioProjectFile(input: $input) {
      portfolioProjectFile {
        filename
        id
        url
      }
    }
  }
`;
