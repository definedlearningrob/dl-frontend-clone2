import { gql } from '@apollo/client';

import { ASSET_TYPE } from '@shared/resources/enums';

export default gql`
  mutation CreatePublicResource($input: CreatePublicResourceMutationInput!) {
    createPublicResource(input: $input) {
      publicResource {
        id
        url
      }
    }
  }
`;

export type TCreatePublicResourceData = {
  createPublicResource: {
    publicResource: {
      id: string;
      url: string;
    };
  };
};

export type TCreatePublicResourceVariables = {
  input: {
    uuid: string;
    filename: string;
    type: ASSET_TYPE;
  };
};
