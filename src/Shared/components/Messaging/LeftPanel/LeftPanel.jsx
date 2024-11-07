import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as RefreshIcon } from '@shared/svg/refresh.svg';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import ParticipantItem from '@shared/components/Messaging/LeftPanel/ParticipantItem/ParticipantItem';
import SharedInfiniteScrollContainer from '@shared/components/InfiniteScrollContainer/InfiniteScrollContainer';
import { Tooltip } from '@shared/components/Tooltip';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { IconButton } from '@shared/components/IconButton/IconButton';

import styles from './LeftPanel.module.sass';

export const LeftPanel = ({
  activeParticipantId,
  conversationGroups,
  fetchMore,
  onRefresh,
  pageInfo,
  preview,
  previewedStudent,
  selectGroup,
  toggleModal,
}) => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const {
    params: { participantId },
  } = useQueryParams();

  useEffect(() => {
    const groupToSet = participantId
      ? conversationGroups.find(
          ({
            node: {
              participant: { uuid },
            },
          }) => uuid === participantId
        )?.node
      : conversationGroups[0].node;

    groupToSet && selectGroup(groupToSet, true);
  }, [participantId]);

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const fetchMoreResults = () => fetchMore({ variables: { after: pageInfo.endCursor } });

  return (
    <SharedInfiniteScrollContainer
      className={styles.leftPanel}
      fetchMore={fetchMoreResults}
      hasNextPage={pageInfo.hasNextPage}>
      <div className={styles.panelHeader}>
        <h2 className='my-xs text-base'>
          {preview
            ? `${previewedStudent.firstName} ${previewedStudent.lastName}`
            : t('messaging.title')}
        </h2>
        <div className='flex items-center justify-end gap-xs'>
          <Tooltip message={t('messaging.refresh')} position='bottom'>
            <IconButton
              Icon={RefreshIcon}
              aria-label={t('common.actions.refresh')}
              size='md'
              variant='primary-outlined'
              onClick={onRefresh}
            />
          </Tooltip>
          {!preview && (
            <IconButton
              Icon={AddIcon}
              aria-label={t('messaging.newConversationAria')}
              data-testid='create-conversation'
              size='md'
              variant='primary'
              onClick={toggleModal}
            />
          )}
        </div>
      </div>
      <ul className='overflow-auto'>
        {conversationGroups.map(({ node }) => (
          <ParticipantItem
            key={node.participant.uuid}
            activeParticipantId={activeParticipantId}
            group={node}
            isTeam={node.participant.__typename === 'Team'}
            onClick={() => selectGroup(node)}
          />
        ))}
      </ul>
    </SharedInfiniteScrollContainer>
  );
};

LeftPanel.propTypes = {
  activeParticipantId: PropTypes.string,
  conversationGroups: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
        participant: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          uuid: PropTypes.string,
        }),
        recentConversation: PropTypes.shape({
          recentMessage: PropTypes.shape({
            body: PropTypes.string,
            createdAt: PropTypes.string,
          }),
        }),
      }),
    })
  ),
  fetchMore: PropTypes.func,
  onRefresh: PropTypes.func,
  pageInfo: PropTypes.shape({
    endCursor: PropTypes.string,
    hasNextPage: PropTypes.bool,
  }),
  preview: PropTypes.bool,
  previewedStudent: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    uuid: PropTypes.string,
  }),
  selectGroup: PropTypes.func,
  toggleModal: PropTypes.func,
};
