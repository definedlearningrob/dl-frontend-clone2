import { gql } from '@apollo/client';

export default gql`
  query Attachment($id: ID!) {
    attachment(id: $id) {
      archivedAt
      description
      displayName
      files {
        id
        filename
        url(options: { responseContentDisposition: "attachment" })
      }
      id
      name
    }
  }
`;
