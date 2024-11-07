import { ApolloError } from '@apollo/client';

import useFindOrCreateGradingConversation from '@pbl/graphql/user/hooks/useFindOrCreateGradingConversation';

import { useMessaging } from '@shared/hooks/useMessaging';
import MessageInput from '@shared/components/MessageInput/MessageInput';
import {
  CONVERSATION_CONTEXT_TYPES,
  CONVERSATION_PARTICIPANT_TYPES,
} from '@shared/resources/enums';
import { callToast } from '@shared/components/Toaster/Toaster';

import { useGradingContext } from '../GradingContext/GradingContext';

type Props = {
  type: CONVERSATION_CONTEXT_TYPES;
  contextId: string;
};

const { STUDENT, TEAM } = CONVERSATION_PARTICIPANT_TYPES;

const GradingBodyMessaging = ({ type, contextId }: Props) => {
  const {
    navigation: { subjectId, isTeamGrading },
  } = useGradingContext();

  const [mutate, { loading: findLoading }] = useFindOrCreateGradingConversation({
    subjectId: subjectId!,
    contextType: type,
    contextId,
    receiverType: isTeamGrading ? TEAM : STUDENT,
  });
  const { sendMessage, isMessageSending } = useMessaging();
  const loading = findLoading || isMessageSending;

  const handleSendMessage = async (msg: string) => {
    try {
      const conversation = await mutate();

      if (!conversation.data) return;

      await sendMessage(conversation.data.findOrCreateConversation.conversation.id, msg);

      callToast('success', 'Message sent');
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);

        return;
      }
      callToast('error', 'Something went wrong');
    }
  };

  return (
    <MessageInput
      label='Leave feedback for the student'
      loading={loading}
      onSend={handleSendMessage}
    />
  );
};

export default GradingBodyMessaging;
