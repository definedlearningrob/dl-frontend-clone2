import { gql } from '@apollo/client';

gql`
  query PartnerOverview($id: ID!) {
    partner(id: $id) {
      about
      additionalUrls
      address
      details
      email
      id
      name
      phone
      thumbnailUrl
      imageFitToContainer
      imageUrl
      url
      courses {
        id
      }
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
          status
          roadmapItemsCount
          readinessSkillsLessons {
            id
          }
        }
        applicationStatus
        isFavorite
        isRecommended
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
        description
        match
        isEnrolled
        status
        type
        metadata {
          alternativeTitles
          averageSalary
          jobZone
          onetCode
          outlook
        }
      }
    }
  }
`;
