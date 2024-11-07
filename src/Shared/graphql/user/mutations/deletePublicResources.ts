import { gql } from '@apollo/client';

import { ASSET_TYPE } from '@shared/resources/enums';

export default gql`
  mutation DeletePublicResources($input: DeletePublicResourcesMutationInput!) {
    deletePublicResources(input: $input) {
      status
    }
  }
`;

export type TDeletePublicResourcesData = {
  deletePublicResources: {
    status: string;
  };
};

export type TDeletePublicResourcesVariables = {
  input: {
    type: ASSET_TYPE;
    uuids: string[];
  };
};
