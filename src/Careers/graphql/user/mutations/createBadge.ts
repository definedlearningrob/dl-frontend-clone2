import { gql, TypedDocumentNode } from '@apollo/client';

export const CREATE_BADGE: TypedDocumentNode<TCreateBadgeData, TCreateBadgeVariables> = gql`
  mutation CreateBadge($input: CreateBadgeMutationInput!) {
    createBadge(input: $input) {
      badge {
        archivedAt
        id
        imageUrl
        name
      }
    }
  }
`;

export type TBadgeInput = {
  name: string;
  imageUuid?: string;
  imageFilename?: string;
};

export type TBadge = {
  archivedAt: string;
  description: string;
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  name: string;
};

export type TCreateBadgeData = {
  badge: TBadge;
};

export type TCreateBadgeVariables = {
  input: TBadgeInput;
};
