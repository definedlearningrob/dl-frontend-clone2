import React from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';

import updateNotification from '@dc/graphql/student/mutations/updateNotification';

import { ReactComponent as NotificationsIcon } from '@shared/svg/info_outlined.svg';
import { type Notification } from '@shared/components/Notifications/types';
import useNotifications from '@shared/hooks/useNotifications';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { NOTIFICATION_TYPES } from '@shared/resources/constants';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  notification: Notification;
};

export const SingleNotification = ({ notification }: Props) => {
  const [readNotification] = useMutation(updateNotification);
  const { unreadNotifications, setUnreadNotifications } = useNotifications();

  const optionClasses = cx('flex m-0 px-xs py-sm rounded-none group hover:bg-secondary-200', {
    '!bg-white hover:!bg-primary-200': notification.read,
  });

  const iconContainerClasses = cx(
    'bg-secondary-200 text-secondary-500 group-hover:!bg-white',
    'flex items-center justify-center grow-0 shrink-0 basis-md',
    'rounded-lg h-md mr-xs',
    {
      '!bg-primary-200 !text-primary-500': notification.read,
    }
  );

  const handleNotificationClick = (notification: Notification) => async () => {
    if (!notification.read) {
      await readNotification({
        variables: { input: { id: notification.id, read: true } },
      });
      const unreadCountStateKey =
        notification.type === NOTIFICATION_TYPES.GENERAL ? 'general' : 'announcements';
      setUnreadNotifications(unreadCountStateKey, unreadNotifications[unreadCountStateKey] - 1);
    }
  };

  return (
    <div
      className={optionClasses}
      data-testid='notification-option'
      onClick={handleNotificationClick(notification)}>
      <IconContainer
        Icon={NotificationsIcon}
        className={iconContainerClasses}
        paddingSize='xs'
        size='sm'
      />
      <div className='container'>
        <InjectedContent
          className='text-font-primary text-xs leading-lg'
          content={notification.body}
        />

        <span className='text-font-secondary text-xxs'>
          {dayjs(notification.updatedAt).fromNow()}
        </span>
      </div>
    </div>
  );
};
