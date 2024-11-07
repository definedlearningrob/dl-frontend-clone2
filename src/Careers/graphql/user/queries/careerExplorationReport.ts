import { gql } from '@apollo/client';

gql`
  query CareerExplorationReport($id: ID!) {
    pathwayReport(id: $id) {
      id
      uploadStatus
      url(options: { responseContentDisposition: "attachment" })
    }
  }
`;
