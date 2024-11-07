import { gql, TypedDocumentNode } from '@apollo/client';

export const EXTERNAL_PRESENTATION_QUERY: TypedDocumentNode<
  ExternalPresentationData,
  ExternalPresentationVariables
> = gql`
  query ExternalPresentation($id: ID!) {
    externalPresentation(id: $id) {
      archivedAt
      displayName
      isExpandable
      id
      name
      source
    }
  }
`;

type ExternalPresentation = {
  archivedAt: string;
  displayName: string;
  id: string;
  name: string;
  source: string;
  isExpandable: boolean;
};

type ExternalPresentationData = {
  data: {
    externalPresentation: ExternalPresentation;
  };
};

type ExternalPresentationVariables = {
  id: string;
};
