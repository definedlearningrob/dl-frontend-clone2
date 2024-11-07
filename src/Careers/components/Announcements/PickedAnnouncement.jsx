import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '@dc/components/Announcements/Announcements.sass';

import announcementQuery from '@dc/graphql/student/queries/announcement';
import Announcement from '@dc/components/Announcements/Announcement/Announcement';
import { RECEIVER_TYPES } from '@dc/resources/constants';

import MessagingModal from '@shared/components/Messaging/Modal/Modal';
import SharedButton from '@shared/components/Button/Button';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { ReactComponent as ArrowLeft } from '@shared/svg/arrow_backward.svg';

function PickedAnnouncement() {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const [receiverModalVisible, setReceiverModalVisible] = useState(false);
  const [initialReceiver, setInitialReceiver] = useState();
  const [replyContext, setReplyContext] = useState();

  const toggleModal = () => setReceiverModalVisible(!receiverModalVisible);

  const handleRedirectToAnnouncements = () => {
    history.push('/announcements');
  };

  return (
    <div className='announcements'>
      <div className='announcements__header'>
        <SharedButton
          className='announcements__header-back-button'
          data-testid='send-reply-button'
          icon={<ArrowLeft />}
          variant='link'
          onClick={handleRedirectToAnnouncements}>
          {t('announcements.goToAnnouncements')}
        </SharedButton>
      </div>
      <div className='announcements__body'>
        <SharedDataLoader options={{ variables: { id } }} query={announcementQuery}>
          {(data) => (
            <Announcement
              announcement={data.announcement}
              setInitialReceiver={setInitialReceiver}
              setReplyContext={setReplyContext}
              toggleModalVisibility={toggleModal}
            />
          )}
        </SharedDataLoader>
      </div>
      {receiverModalVisible && (
        <MessagingModal
          context={replyContext}
          initialReceiver={initialReceiver}
          receiverType={RECEIVER_TYPES.USER}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}

export default PickedAnnouncement;
