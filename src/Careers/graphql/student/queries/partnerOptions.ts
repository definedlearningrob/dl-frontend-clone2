import { gql } from '@apollo/client';

gql`
  query StudentPartnerOptions($page: Int, $perPage: Int, $filter: StudentPartnerFilter) {
    partners(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        id
        name
      }
      pagesCount
    }
  }
`;
