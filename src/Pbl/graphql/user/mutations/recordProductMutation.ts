import { gql } from '@apollo/client';

export default gql`
  mutation RecordProduct($input: UpdateLtiResourceMutationInput!) {
    updateLtiResource(input: $input) {
      ltiResource {
        ltiResourceLinkId
        contextId
        consumerKey
      }
      product {
        name
      }
      task {
        name
      }
      user {
        dlUuid: definedLearningUuid
      }
    }
  }
`;

export type RecordProductData = {
  updateLtiResource: {
    ltiResource: TLtiResource;
    product: TProduct;
    task: TTask;
    user: TUser;
  };
};

type TLtiResource = {
  ltiResourceLinkId: string;
  contextId: string;
  consumerKey: string;
};

type TProduct = {
  name: string;
};

type TTask = {
  name: string;
};

type TUser = {
  dlUuid: string;
};
