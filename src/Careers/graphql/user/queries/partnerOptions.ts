import { gql } from '@apollo/client';

gql`
  query UserPartnerOptions($page: Int, $perPage: Int, $filter: PartnerFilter) {
    partners(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        id
        name
        status
      }
      pagesCount
    }
  }
`;
