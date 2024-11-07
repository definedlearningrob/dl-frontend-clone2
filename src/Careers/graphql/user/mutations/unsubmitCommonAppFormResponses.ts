import { TypedDocumentNode, gql } from '@apollo/client';

import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

export const UNSUBMIT_COMMON_APP_FORM_RESPONSES: TypedDocumentNode<
  UnsubmitCommonAppFormResponsesData,
  UnsubmitCommonAppFormResponsesMutationInput
> = gql`
  mutation UnsubmitCommonAppFormResponses($input: UnsubmitCommonAppFormResponsesMutationInput!) {
    unsubmitCommonAppFormResponses(input: $input) {
      status
    }
  }
`;

export type UnsubmitCommonAppFormResponsesMutationInput = {
  input: {
    type: COMMON_APP_FORM_TYPES;
    studentUuid: string;
    institutionId?: string;
  };
};

export type UnsubmitCommonAppFormResponsesData = {
  unsubmitCommonAppFormResponses: {
    status: string;
  };
};
