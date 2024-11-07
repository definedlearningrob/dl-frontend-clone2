import { gql } from '@apollo/client';

export default gql`
  query PartnerOpportunities($filter: OpportunityFilter, $page: Int, $perPage: Int) {
    opportunities(filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        imageUrl
        thumbnailUrl
        name
        opportunityType
        visibilityScope
        id
        pathways {
          name
        }
        entities {
          name
          uuid
        }
      }
      nodesCount
      pagesCount
    }
  }
`;
