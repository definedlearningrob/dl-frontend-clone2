import { gql } from '@apollo/client';

export default gql`
  mutation UpdateExtensionField($input: UpdateExtensionFieldMutationInput!) {
    updateExtensionField(input: $input) {
      extensionField {
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
  }
`;

export type TUpdateExtensionData = {
  updateExtensionField: {
    extensionField: TExtensionField;
  };
};

type TExtensionField = {
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

export type TUpdateExtensionVariables = {
  input: {
    id: string;
    name?: string;
    description?: string;
    imageUuid?: string;
    imageFilename?: string;
    links?: TExtensionLink[];
    courseIds?: string[];
    pathwayIds?: string[];
    clusterIds?: string[];
    publishedFrom?: string;
    publishedTo?: string | null;
    status?: 'DRAFT' | 'PUBLISHED';
  };
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
