import { gql } from '@apollo/client';

gql`
  query Partners($filter: PartnerFilter, $page: Int, $perPage: Int, $nameSortOrder: SortingOrder) {
    partners(filter: $filter, page: $page, perPage: $perPage, nameSortOrder: $nameSortOrder) {
      nodesCount
      pagesCount
      nodes {
        about
        additionalUrls
        address
        canEdit
        coursesCount
        details
        email
        id
        imageUrl
        imageFitToContainer
        isArchived
        name
        opportunitiesCount
        phone
        status
        thumbnailUrl
        url
        virtualInternshipsCount
        visibilityScope
      }
    }
  }
`;
