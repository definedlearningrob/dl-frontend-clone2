import { gql } from '@apollo/client';

gql`
  mutation UpdatePartner($input: UpdatePartnerMutationInput!) {
    updatePartner(input: $input) {
      partner {
        about
        additionalUrls
        address
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
