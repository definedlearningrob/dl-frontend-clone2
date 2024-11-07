import { gql } from '@apollo/client';

export default gql`
  query ExtensionField($id: ID!) {
    extensionField(id: $id) {
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
      files {
        id
        filename
        url(options: { responseContentDisposition: "attachment" })
      }
      id
      imageUrl
      links {
        name
        url
      }
      name
      pathways {
        id
        name
      }
      publishedFrom
      publishedTo
      status
    }
  }
`;

export type TExtensionFieldsData = {
  extensionField: TExtensionField;
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
  clusters: {
    id: string;
    name: string;
  }[];
  courses: {
    id: string;
    name: string;
  }[];
  description: string;
  files: TExtensionFile[];
  id: string;
  imageUrl: string;
  links: TExtensionLink[];
  name: string;
  pathways: {
    id: string;
    name: string;
  }[];
  publishedFrom: string;
  publishedTo: string;
  status: TExtensionStatus;
};

export type TExtensionFieldsVariables = {
  id: string;
};

type TExtensionLink = {
  name: string;
  url: string;
};

type TExtensionFile = {
  id: string;
  filename: string;
  url: string;
};

type TExtensionStatus = 'DRAFT' | 'PUBLISHED';
