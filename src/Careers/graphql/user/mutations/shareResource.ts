import { TypedDocumentNode, gql } from '@apollo/client';

export const SHARE_RESOURCE: TypedDocumentNode<TShareResourceData, TShareResourceVariables> = gql`
  mutation ShareResource($input: ShareResourceMutationInput!) {
    shareResource(input: $input) {
      sharedResource {
        allowLogin
        code
      }
    }
  }
`;

export type TSharedResource = {
  allowLogin: boolean;
  code: string;
};

export type TShareResourceData = {
  shareResource: {
    sharedResource: TSharedResource;
  };
};

export type TShareResourceVariables = {
  input: {
    allowLogin: boolean;
    resourceType: keyof typeof SHARED_RESOURCE_TYPES;
    resourceId: string;
  };
};

export const SHARED_RESOURCE_TYPES = {
  COURSE: 'COURSE',
} as const;
