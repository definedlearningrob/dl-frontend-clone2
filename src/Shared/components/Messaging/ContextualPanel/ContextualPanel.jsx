import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RECEIVER_TYPES } from '@shared/resources/constants';
import { ReactComponent as EyeIcon } from '@shared/svg/visible_outlined.svg';
import Conversation from '@shared/components/Messaging/ContextualPanel/Conversation/Conversation';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useMessaging } from '@shared/hooks/useMessaging';
import { UserHeader } from '@shared/components/Messaging/PanelHeader/UserHeader';
import { TeamHeader } from '@shared/components/Messaging/PanelHeader/TeamHeader';

import styles from './ContextualPanel.module.sass';

MessagingContextualPanel.propTypes = {
  activeGroup: PropTypes.shape({
    participant: PropTypes.shape({
      __typename: PropTypes.string,
      members: PropTypes.arrayOf(
        PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          uuid: PropTypes.string,
        })
      ),
      name: PropTypes.string,
      owner: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        uuid: PropTypes.string,
      }),
      uuid: PropTypes.string,
    }),
  }),
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
        recentMessage: PropTypes.shape({
          body: PropTypes.string,
          createdAt: PropTypes.string,
        }),
      }),
    })
  ),
  preview: PropTypes.bool,
  receiverType: PropTypes.string,
  selectConversation: PropTypes.func,
};

function MessagingContextualPanel({
  activeGroup,
  conversations,
  preview,
  receiverType,
  selectConversation,
}) {
  const history = useHistory();
  const {
    params: { conversationId, participantId },
  } = useQueryParams();
  const { t } = useTranslation();
  const { isPreviewPossible } = useMessaging();

  const goToStudentPreview = () => history.push(`/students/${participantId}/messages`);

  useEffect(() => {
    const conversationToSet =
      conversationId && conversations.find(({ node: { id } }) => id === conversationId)?.node;

    conversationToSet && selectConversation(conversationToSet);
  }, []);

  const shouldShowPreviewButton = receiverType === RECEIVER_TYPES.STUDENT && isPreviewPossible;

  const avatarName = activeGroup.participant.name.split(' ');
  const [firstName, lastName] = avatarName;
  const userName = { firstName, lastName };

  const isTeam = activeGroup.participant.__typename === 'Team';

  return (
    <section className={styles.contextualPanel}>
      <div className={styles.panelHeader}>
        {!isTeam && <UserHeader name={activeGroup.participant.name} userName={userName} />}
        {isTeam && (
          <TeamHeader
            members={activeGroup.participant.members}
            teacher={activeGroup.participant.owner}
            teamName={activeGroup.participant.name}
          />
        )}
        {shouldShowPreviewButton && (
          <SharedButton variant='primary-outlined' onClick={goToStudentPreview}>
            <span className={styles.historyButton}>
              <SharedIcon className='button__icon' icon={<EyeIcon />} size='sm' />
              {t('messaging.previewMessages')}
            </span>
          </SharedButton>
        )}
      </div>
      <ul className={`${styles.panelList} transparent-scrollbar`}>
        {conversations.map(({ node }) => (
          <Conversation
            key={node.id}
            conversation={node}
            preview={preview}
            selectConversation={() => selectConversation(node)}
          />
        ))}
      </ul>
    </section>
  );
}

export default MessagingContextualPanel;
