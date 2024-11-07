import { useContext, useState, useEffect, useRef } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Announcement from '@dc/components/Announcements/Announcement/Announcement';
import announcementsQuery from '@dc/graphql/student/queries/announcements';
import { RECEIVER_TYPES } from '@dc/resources/constants';
import { ToastContext } from '@dc/context/toastContext';

import MessagingModal from '@shared/components/Messaging/Modal/Modal';
import { NOTIFICATION_TYPES } from '@shared/resources/constants';
import markAllNotificationsAsReadMutation from '@shared/graphql/student/mutations/markAllNotificationsAsRead';
import SharedInfiniteScrollContainer from '@shared/components/InfiniteScrollContainer/InfiniteScrollContainer';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useNotifications from '@shared/hooks/useNotifications';

import '@dc/components/Announcements/Announcements.sass';

function Announcements() {
  const loader = useRef(null);
  const QUERY_NOTIFICATIONS_FIRST_NUMBER = 10;
  const [receiverModalVisible, setReceiverModalVisible] = useState(false);
  const [initialReceiver, setInitialReceiver] = useState();
  const [replyContext, setReplyContext] = useState();
  const [readAll] = useMutation(markAllNotificationsAsReadMutation);
  const { dispatch } = useContext(ToastContext);
  const { t } = useTranslation();
  const { unreadNotifications, setUnreadNotifications } = useNotifications();
  const { data, fetchMore, loading } = useQuery(announcementsQuery, {
    variables: { first: QUERY_NOTIFICATIONS_FIRST_NUMBER },
  });

  const toggleModal = () => setReceiverModalVisible(!receiverModalVisible);

  useEffect(() => {
    if (unreadNotifications.announcements > 0) {
      readAll({
        variables: { input: { type: NOTIFICATION_TYPES.ANNOUNCEMENT } },
        update(cache) {
          cache.modify({
            fields: {
              notifications(existing, { readField }) {
                const newRefs = existing.nodes.map((ref) => {
                  const newNotification = {
                    __typename: 'Notification',
                    id: readField('id', ref),
                    body: readField('body', ref),
                    read: true,
                    updatedAt: readField('updatedAt', ref),
                  };

                  return cache.writeFragment({
                    data: newNotification,
                    fragment: gql(`
                      fragment UpdatedNotification on Notification {
                        id,
                        body,
                        read,
                        updatedAt
                      }
                    `),
                  });
                });

                return { ...existing, nodes: newRefs };
              },
            },
          });
        },
      });

      setUnreadNotifications('announcements', 0);

      dispatch({ type: 'DELETE_ALL_NOTIFICATIONS' });
    }
  }, [unreadNotifications]);

  const fetchMoreResults = () =>
    fetchMore({
      variables: {
        after: data?.announcements.pageInfo.endCursor,
        first: QUERY_NOTIFICATIONS_FIRST_NUMBER,
      },
    });

  const renderAnnouncements = () =>
    data?.announcements?.edges.map((announcement) => (
      <Announcement
        key={announcement.node.id}
        announcement={announcement.node}
        setInitialReceiver={setInitialReceiver}
        setReplyContext={setReplyContext}
        toggleModalVisibility={toggleModal}
      />
    ));

  return (
    <SharedInfiniteScrollContainer
      className='announcements'
      fetchMore={fetchMoreResults}
      hasNextPage={data?.announcements.pageInfo.hasNextPage}>
      <h3 className='announcements__header'> {t('announcements.title')}</h3>
      <div className='announcements__body'>
        {loading ? <SharedLoadingSpinner size='medium' /> : renderAnnouncements()}
      </div>
      {receiverModalVisible && (
        <MessagingModal
          context={replyContext}
          initialReceiver={initialReceiver}
          receiverType={RECEIVER_TYPES.USER}
          selectDisabled={true}
          toggleModal={toggleModal}
        />
      )}
      <div ref={loader} className='loading' />
    </SharedInfiniteScrollContainer>
  );
}

export default Announcements;
