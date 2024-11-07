import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import createAnnouncementMutation from '@dc/graphql/user/mutations/createAnnouncement';
import SharedTextEditor from '@dc/components/shared/TextEditor/TextEditor';
import { announcementsToolbarConfig } from '@dc/components/shared/TextEditor/EditorToolbars/editorToolbars';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

import '@dc/components/Announcements/Announcements.sass';

AnnouncementModal.propTypes = {
  onModalClose: PropTypes.func,
  receiver: PropTypes.object,
};

function AnnouncementModal({ receiver, onModalClose }) {
  const { t } = useTranslation();
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [mutateCreateAnnouncement] = useMutation(createAnnouncementMutation);

  const sendDisabled = useMemo(
    () => !receiver || !announcementMessage,
    [receiver, announcementMessage]
  );

  const updateAnnouncementMessage = (value) => {
    setAnnouncementMessage(value);
  };

  const onAnnouncementSend = () => {
    setAnnouncementMessage('');
    onModalClose();
    callToast('success', t('announcements.sentSuccessfully'));
  };

  const createAnnouncement = async () => {
    const targetType = 'SCHOOL_CLASS';

    try {
      await mutateCreateAnnouncement({
        variables: {
          input: {
            targetType,
            targetUuid: receiver.uuid,
            body: announcementMessage,
          },
        },
      });

      onAnnouncementSend();
    } catch (error) {
      throw error;
    }
  };

  return (
    <SharedModal isOpen={true} onDismiss={onModalClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('announcements.create.createAnnouncement')}</SharedModal.Heading>
        <SharedModal.Heading />
      </SharedModal.Header>
      <SharedModal.Body>
        <div className='messages-left-panel__modal__context__announcements'>
          <div className='messages-left-panel__modal__context-titles__announcements'>
            <span>{t('announcements.create.sendingTo')}:</span>
            <span>
              {' '}
              {receiver.entityName} - {receiver.schoolClassName}
            </span>
          </div>
          <SharedTextEditor
            editorConfig={{ onChange: updateAnnouncementMessage, value: announcementMessage }}
            id='message-area'
            label={t('messaging.new.message')}
            placeholder={t('announcements.create.announcementMessage')}
            toolbar={announcementsToolbarConfig}
          />
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='announcement-modal-button'
          disabled={sendDisabled}
          variant='primary'
          onClick={createAnnouncement}>
          {t('messaging.new.send')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AnnouncementModal;
