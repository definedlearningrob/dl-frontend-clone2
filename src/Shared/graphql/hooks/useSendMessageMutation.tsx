import { MutationFunctionOptions, useMutation } from '@apollo/client';

import SEND_MESSAGE, {
  SendMessageMutationData,
  SendMessageMutationVariables,
} from '@shared/graphql/shared/mutations/sendMessage';

const useSendMessageMutation = () =>
  useMutation<SendMessageMutationData, SendMessageMutationVariables>(SEND_MESSAGE);

export type SendMessageFnOptions = MutationFunctionOptions<
  SendMessageMutationData,
  SendMessageMutationVariables
>;
export default useSendMessageMutation;
