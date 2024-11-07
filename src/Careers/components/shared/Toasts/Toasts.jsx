import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Announcements } from '@dc/svg/announcement.svg';
import { ToastContext } from '@dc/context/toastContext';

import { ReactComponent as ArrowRight } from '@shared/svg/arrow_forward.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import useNotifications from '@shared/hooks/useNotifications';
import '@dc/components/shared/Toasts/Toast.sass';

function Toasts() {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const { state } = useContext(ToastContext);
  const { t } = useTranslation();
  const { setUnreadNotifications } = useNotifications();
  const toastClasses = cx('notification-container', { '-hide': !state.length });

  useEffect(() => {
    if (state && state.length <= 3) {
      setNotifications(state);
    }

    if (state && state.length > 3) {
      const newArray = [];

      state.map((notification) => {
        newArray.push(notification);
      });

      setNotifications(newArray.slice(0, 2));
    }

    setUnreadNotifications('announcements', state.length);
  }, [state]);

  const handleOnClick = (notification) => () => {
    setUnreadNotifications('announcements', state.length - 1);
    notification.callback();
  };

  const handleRedirectToAnnouncements = () => {
    history.push('/announcements');
  };

  const renderPushAnnouncements = (notification) => (
    <div
      key={notification.id}
      className='notification push-notification__container toast'
      onClick={handleOnClick(notification)}>
      <div className='push-notification__header'>
        <SharedIcon className='push-notification__header-icon' icon={<Announcements />} size='sm' />
        {notification?.firstName} {notification?.lastName}
      </div>
      <div className='push-notification__body'>
        <span className='push-notification__body-option'>{notification.message}</span>
        <span className='push-notification__body-read-more'>
          {t('announcements.readMore')}
          <SharedIcon
            className='push-notification__body-read-more-icon'
            icon={<ArrowRight />}
            size='xs'
          />
        </span>
      </div>
    </div>
  );

  const renderMoreAnnouncementsPushInfo = () => (
    <div
      className='notification push-notification__container toast'
      onClick={handleRedirectToAnnouncements}>
      <div className='push-notification__text'>
        {t('announcements.youHaveUnread', { length: state.length - 2 })}
      </div>
      <div className='push-notification__body'>
        <span className='push-notification__body-option -center'>
          {t('announcements.goToAnnouncementsPage')}
        </span>
        <div className='push-notification__body-button-wrapper'>
          <SharedButton
            className='push-notification__body-button'
            data-testid='go-to-announcements-button'
            variant='primary-outlined'>
            {t('announcements.goToAnnouncements')}
          </SharedButton>
        </div>
      </div>
    </div>
  );

  return (
    <div className={toastClasses}>
      {notifications && notifications.map((notification) => renderPushAnnouncements(notification))}
      {state && state.length > 3 && renderMoreAnnouncementsPushInfo()}
    </div>
  );
}

export default Toasts;
