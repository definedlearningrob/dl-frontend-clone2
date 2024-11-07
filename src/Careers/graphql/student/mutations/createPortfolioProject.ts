import { gql } from '@apollo/client';

export default gql`
  mutation CreatePortfolioProject($input: CreatePortfolioProjectMutationInput!) {
    createPortfolioProject(input: $input) {
      portfolioProject {
        description
        id
        imageUrl
        name
        submission {
          files {
            filename
            id
            url
          }
        }
      }
    }
  }
`;
