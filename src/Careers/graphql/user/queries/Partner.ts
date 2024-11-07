import { gql } from '@apollo/client';

gql`
  query Partner($id: ID!) {
    partner(id: $id) {
      name
      about
      additionalUrls
      address
      coursesCount
      details
      email
      entities {
        dcIconUrl
        dcLogoUrl
        dlIconUrl
        dlLogoUrl
        gradingNeeded
        hasCareersContract
        hasPblContract
        name
        regionName
        reportTypes
        uuid
      }
      courses {
        id
        name
        thumbnailUrl
        collection {
          id
          name
        }
        pathway {
          id
          name
          description
          imageUrl
          thumbnailUrl
        }
      }
      opportunities {
        id
        name
        imageUrl
        thumbnailUrl
        name
        opportunityType
        visibilityScope
        entities {
          name
          uuid
        }
        pathways {
          name
        }
      }
      id
      imageUrl
      imageFitToContainer
      isArchived
      opportunitiesCount
      pathways {
        description
        id
        imageUrl
        name
        thumbnailUrl
      }
      phone
      status
      thumbnailUrl
      url
      virtualInternshipsCount
      visibilityScope
      documents {
        createdAt
        filename
        id
        submitter {
          uuid
          firstName
          lastName
        }
        url(options: { responseContentDisposition: "attachment" })
        previewUrl: url
      }
    }
  }
`;
