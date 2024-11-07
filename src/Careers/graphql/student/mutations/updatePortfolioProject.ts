import { gql } from '@apollo/client';

export default gql`
  mutation UpdatePortfolioProject($input: UpdatePortfolioProjectMutationInput!) {
    updatePortfolioProject(input: $input) {
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
