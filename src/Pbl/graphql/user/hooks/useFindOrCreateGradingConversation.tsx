import { useMutation } from '@apollo/client';

import FIND_OR_CREATE_CONVERSATION, {
  FindOrCreateConversationMutationData,
  FindOrCreateConversationMutationVariables,
} from '@shared/graphql/shared/mutations/findOrCreateConversation';
import {
  CONVERSATION_TYPES,
  CONVERSATION_CONTEXT_TYPES,
  CONVERSATION_PARTICIPANT_TYPES,
} from '@shared/resources/enums';

type Props = {
  subjectId: string;
  contextType: CONVERSATION_CONTEXT_TYPES;
  contextId: string;
  receiverType?: CONVERSATION_PARTICIPANT_TYPES;
};

const useFindOrCreateGradingConversation = ({
  subjectId,
  contextType,
  contextId,
  receiverType = CONVERSATION_PARTICIPANT_TYPES.STUDENT,
}: Props) =>
  useMutation<FindOrCreateConversationMutationData, FindOrCreateConversationMutationVariables>(
    FIND_OR_CREATE_CONVERSATION,
    {
      variables: {
        input: {
          type: CONVERSATION_TYPES.CONTEXTUAL,
          receiverUuid: subjectId,
          contextId,
          contextType,
          receiverType,
        },
      },
    }
  );

export default useFindOrCreateGradingConversation;
