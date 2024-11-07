import { gql } from '@apollo/client';

export default gql`
  mutation UpdateLesson($input: UpdateLessonMutationInput!) {
    updateLesson(input: $input) {
      lesson {
        assignments {
          assetName
          description
          displayName
          id
          step
        }
        attachments {
          description
          displayName
          files {
            filename
            id
            url(options: { responseContentDisposition: "attachment" })
          }
          id
          name
          step
        }
        description {
          introduction
          goal
          role
          audience
          situation
        }
        id
        imageUrl
        name
        externalPresentations {
          displayName
          id
          name
          source
        }
        researchLinks {
          author
          displayName
          id
          name
          resourceLink
          sourceName
          step
        }
        texts {
          content
          displayName
          id
          name
          step
        }
        type
        videos {
          description
          displayName
          filename
          id
          name
          url
          step
        }
        vocabularies {
          definition
          id
          step
          term
        }
      }
    }
  }
`;
