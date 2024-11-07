import { gql } from '@apollo/client';

export default gql`
  mutation CreateResearchLink($input: CreateResearchLinkMutationInput!) {
    createResearchLink(input: $input) {
      researchLink {
        author
        displayName
        id
        name
        resourceLink
        sourceName
      }
    }
  }
`;
