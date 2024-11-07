import { gql } from '@apollo/client';

export default gql`
  query StudentLtiResource($ltiResourceLinkId: String, $contextId: String) {
    ltiResource(ltiResourceLinkId: $ltiResourceLinkId, contextId: $contextId) {
      ltiResourceLinkId
      contextId
      taskId
      productId
      originatorId
    }
  }
`;

export type LtiResourceVariables = {
  ltiResourceLinkId: string;
  contextId: string;
};
