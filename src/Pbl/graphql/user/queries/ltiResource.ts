import { gql } from '@apollo/client';

export default gql`
  query UserLtiResource($ltiResourceLinkId: String, $contextId: String) {
    ltiResource(ltiResourceLinkId: $ltiResourceLinkId, contextId: $contextId) {
      ltiResourceLinkId
      contextId
      taskId
      productId
    }
  }
`;

export type LtiResourceVariables = {
  ltiResourceLinkId: string;
  contextId: string;
};
