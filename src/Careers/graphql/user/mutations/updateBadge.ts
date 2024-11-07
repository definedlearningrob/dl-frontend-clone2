import { gql, TypedDocumentNode } from '@apollo/client';

export const UPDATE_BADGE: TypedDocumentNode<TUpdateBadgeData, TUpdateBadgeVariables> = gql`
  mutation UpdateBadge($input: UpdateBadgeMutationInput!) {
    updateBadge(input: $input) {
      badge {
        archivedAt
        id
        description
        imageUrl
        name
      }
    }
  }
`;

export type TBadgeInputUpdate = {
  id: string;
  name: string;
  imageUuid?: string;
  description: string;
  imageFilename?: string;
};

export type TBadge = {
  archivedAt: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
};

export type TUpdateBadgeData = {
  badge: TBadge;
};

export type TUpdateBadgeVariables = {
  input: TBadgeInputUpdate;
};
