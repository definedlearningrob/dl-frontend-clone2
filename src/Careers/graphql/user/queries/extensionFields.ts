import { gql } from '@apollo/client';

export default gql`
  query ExtensionFields(
    $page: Int
    $perPage: Int
    $filter: ExtensionFieldFilter
    $scope: ArchivableStatus
  ) {
    extensionFields(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
      nodes {
        archivedAt
        author {
          email
          firstName
          lastName
          username
          uuid
        }
        clusters {
          id
          name
        }
        courses {
          id
          name
        }
        description
        id
        imageUrl
        name
        pathways {
          id
          name
        }
        publishedFrom
        publishedTo
        status
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TExtensionFieldsData = {
  extensionFields: {
    nodes: TExtensionField[];
    nodesCount: number;
    pagesCount: number;
  };
};

export type TExtensionField = {
  archivedAt: string;
  author: {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    uuid: string;
  };
  clusters: TExtensionFieldsAssignmentItem[];
  courses: TExtensionFieldsAssignmentItem[];
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  pathways: TExtensionFieldsAssignmentItem[];
  publishedFrom: string;
  publishedTo: string;
  status: TStatus;
};

export type TExtensionFieldsVariables = {
  page: number;
  perPage: number;
  filter: {
    statusEq: TStatus;
  };
  scope: 'ALL' | 'ACTIVE' | 'ARCHIVED';
};

type TExtensionFieldsAssignmentItem = {
  id: string;
  name: string;
};

type TStatus = 'DRAFT' | 'PUBLISHED';
