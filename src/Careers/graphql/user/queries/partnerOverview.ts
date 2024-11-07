import { gql } from '@apollo/client';

gql`
  query PartnerOverview($id: ID!) {
    partner(id: $id) {
      about
      additionalUrls
      address
      canEdit
      coursesCount
      details
      email
      entities {
        uuid
      }
      id
      name
      isArchived
      opportunitiesCount
      opportunities {
        id
        name
      }
      pathways {
        id
      }
      phone
      status
      thumbnailUrl
      imageUrl
      imageFitToContainer
      url
      virtualInternshipsCount
      visibilityScope
      opportunities {
        id
        name
        opportunityType
        pathways {
          id
          name
        }
        imageUrl
        deadline
        periodStart
        periodEnd
        virtualInternship {
          roadmapItemsCount
          readinessSkillsLessons {
            id
          }
        }
        hasPendingApplications
      }
      courses {
        id
        name
        collection {
          name
        }
        pathway {
          name
        }
        thumbnailUrl
        imageUrl
        type
        description
        metadata {
          alternativeTitles
        }
      }
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
