import { gql } from '@apollo/client';

export default gql`
  mutation UpdateResearchLink($input: UpdateResearchLinkMutationInput!) {
    updateResearchLink(input: $input) {
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
