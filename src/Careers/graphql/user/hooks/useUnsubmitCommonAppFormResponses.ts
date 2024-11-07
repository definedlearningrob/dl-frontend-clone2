import { useMutation } from '@apollo/client';

import { UNSUBMIT_COMMON_APP_FORM_RESPONSES } from '@dc/graphql/user/mutations/unsubmitCommonAppFormResponses';

export const useUnsubmitCommonAppFormResponses = () =>
  useMutation(UNSUBMIT_COMMON_APP_FORM_RESPONSES);
