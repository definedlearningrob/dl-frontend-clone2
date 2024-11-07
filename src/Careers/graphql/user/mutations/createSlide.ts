import { gql } from '@apollo/client';

export default gql`
  mutation CreateSlide($input: CreateSlideMutationInput!) {
    createSlide(input: $input) {
      slide {
        backgroundColor
        backgroundImage
        content {
          id
          images {
            contentId
            id
            url
            style
            thumbnailUrl
          }
          links {
            targetId
            targetName
            text
            contentId
          }
          texts {
            contentId
            type
            value
            style
          }
          videos {
            contentId
            url
          }
        }
        description
        id
        iframeUrl
        isShared
        name
        notes
        template
      }
    }
  }
`;
