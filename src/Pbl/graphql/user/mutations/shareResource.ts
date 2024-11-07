import { gql } from '@apollo/client';

import { SHARED_RESOURCE_TYPES } from '@pbl/resources/constants';

export default gql`
  mutation ShareResource($input: ShareResourceMutationInput!) {
    shareResource(input: $input) {
      sharedResource {
        allowLogin
        code
      }
    }
  }
`;

export type TShareResourceMutationData = {
  shareResource: {
    sharedResource: {
      allowLogin: boolean;
      code: string;
    };
  };
};

export type TShareResourceMutationVariables = {
  input: {
    allowLogin: boolean;
    resourceType: keyof typeof SHARED_RESOURCE_TYPES;
    resourceId: string;
  };
};
