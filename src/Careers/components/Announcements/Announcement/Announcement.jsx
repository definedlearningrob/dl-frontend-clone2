/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { CONVERSATION_CONTEXT_TYPES } from '@dc/resources/constants';
import { ReactComponent as Announcements } from '@dc/svg/announcement.svg';
import { ReactComponent as CommentText } from '@dc/svg/comment_text_outlined.svg';

import { removeTags } from '@shared/utils/removeTags';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { cleanInjection } from '@shared/utils/cleanInjection';
import '@dc/components/Announcements/Announcements.sass';
import { formatDateTime } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';

Announcement.propTypes = {
  announcement: PropTypes.object,
  setInitialReceiver: PropTypes.func,
  setReplyContext: PropTypes.func,
  toggleModalVisibility: PropTypes.func,
};

function Announcement({
  announcement,
  setInitialReceiver,
  setReplyContext,
  toggleModalVisibility,
}) {
  const {
    author: { firstName, lastName, uuid },
    body,
    target: { name: className },
  } = announcement;
  const { t } = useTranslation();
  const announcementDate = announcement.createdAt;
  const contextSubtitle = `${removeTags(body).slice(0, 50)}...`;

  const handleReplyButtonAction = () => {
    setInitialReceiver({
      firstName,
      lastName,
      uuid,
    });

    toggleModalVisibility();
    setReplyContext({
      id: announcement.id,
      subtitle: contextSubtitle,
      title: t('announcements.announcement'),
      type: CONVERSATION_CONTEXT_TYPES.ANNOUNCEMENT,
    });
  };

  return (
    <section className='announcement-container'>
      <div className='announcement-container__header'>
        <div className='announcement-container__header-icon'>
          <SharedIcon icon={<Announcements />} size='sm' />
        </div>
        <div className='announcement-container__header-body'>
          <h4 className='announcement-container__header-teacher-name'>{`${firstName} ${lastName}`}</h4>
          <span className='announcement-container__header-class-name'>
            {t('announcements.in')} {className}
          </span>
          <span className='announcement-container__header-middle-dot'>&#183;</span>
          <div className='announcement-container__header-date'>
            <Tooltip message={formatDateTime(announcementDate, { withTime: true })}>
              {formatDateTime(announcementDate)}
            </Tooltip>
          </div>
        </div>
        <SharedButton
          className='announcement-container__header-reply-button'
          data-testid='send-reply-button'
          icon={<CommentText />}
          size='sm'
          variant='primary-outlined'
          onClick={handleReplyButtonAction}>
          {t('announcements.reply')}
        </SharedButton>
      </div>
      <div
        className='announcement-container__body'
        dangerouslySetInnerHTML={cleanInjection(body)}
      />
    </section>
  );
}

export default Announcement;
