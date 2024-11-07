import { gql } from '@apollo/client';

gql`
  query Partners {
    partners {
      nodes {
        id
        name
        thumbnailUrl
        about
        imageUrl
        imageFitToContainer
        opportunities {
          id
          opportunityType
        }
        courses {
          id
        }
      }
    }
  }
`;
