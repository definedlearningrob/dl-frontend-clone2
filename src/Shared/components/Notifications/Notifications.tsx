import cx from 'classnames';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { DocumentNode } from 'graphql';
import InfiniteScroll from 'react-infinite-scroller';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { NOTIFICATION_SCOPES, NOTIFICATION_TYPES } from '@shared/resources/constants';
import { ReactComponent as NotificationsIcon } from '@shared/svg/notifications.svg';
import { ReactComponent as AnnouncementsIcon } from '@shared/svg/announcement.svg';
import { SingleNotification } from '@shared/components/Notifications';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useNotifications from '@shared/hooks/useNotifications';
import { EmptyNotifications } from '@shared/components/Notifications/EmptyNotifications/EmptyNotifications';
import { useReadAllNotificationsMutation } from '@shared/components/Notifications/useReadAllNotificationsMutation';

import styles from './Notifications.module.sass';
import { TNotificationsData, TNotificationsVariables } from './types';

const notificationsByType = {
  [NOTIFICATION_TYPES.GENERAL]: {
    typeKey: 'general' as const,
    icon: NotificationsIcon,
    headerTranslationKey: 'appHeader.notifications.header',
  },
  [NOTIFICATION_TYPES.ANNOUNCEMENT]: {
    typeKey: 'announcements' as const,
    icon: AnnouncementsIcon,
    headerTranslationKey: 'announcements.announcements',
  },
};

type Props = {
  query: DocumentNode;
  type?: NOTIFICATION_TYPES;
  theme?: 'default' | 'light';
};

export const Notifications = (props: Props) => {
  const { query, type = NOTIFICATION_TYPES.GENERAL, theme = 'default' } = props;
  dayjs.extend(relativeTime);
  const { unreadNotifications, setUnreadNotifications } = useNotifications();
  const [markAllNotificationsAsRead] = useReadAllNotificationsMutation();
  const [isOpen, setIsOpen] = useState(false);

  const currentPage = useRef(1);

  const { t } = useTranslation();

  const { data, fetchMore, loading } = useQuery<TNotificationsData, TNotificationsVariables>(
    query,
    {
      variables: {
        page: 1,
        perPage: 10,
        scope: NOTIFICATION_SCOPES.ALL,
        type,
      },
    }
  );
  const { typeKey, icon: IconComponent, headerTranslationKey } = notificationsByType[type];

  const hasUnread = useMemo(() => unreadNotifications[typeKey] > 0, [unreadNotifications[typeKey]]);
  const hasNotifications = !loading && !isEmpty(data?.notifications?.nodes);
  const isLightTheme = theme === 'light';

  const notificationButtonClasses = cx('text-font-secondary', {
    'hover:!bg-transparent hover:text-primary-500': !isLightTheme,
    'text-primary-500': hasUnread,
    'text-primary-500 !bg-white': isOpen && !isLightTheme,
    'text-white hover:!text-white hover:!bg-secondary-600': isLightTheme,
    '!text-white !bg-secondary-600': isLightTheme && isOpen,
  });
  const hasNextPage = useMemo(
    () => !isEmpty(data) && data.notifications?.pagesCount > currentPage.current,
    [data, currentPage?.current]
  );

  const handleFetch = (nextPageNumber: number) => {
    fetchMore?.({ variables: { perPage: 10, page: nextPageNumber } });
    currentPage.current = nextPageNumber;
  };

  const handleReadAll = async () => {
    if (unreadNotifications[typeKey] > 0) {
      await markAllNotificationsAsRead(type);
      setUnreadNotifications(typeKey, 0);
    }
  };

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild={true}>
        <div className={styles.trigger} data-testid='notifications-dropdown-trigger'>
          <DeprecatedIconButton
            className={notificationButtonClasses}
            icon={<IconComponent />}
            size='sm'
            square={true}>
            {hasUnread && (
              <span className={styles.unreadLabel} data-testid='unread-label'>
                {unreadNotifications[typeKey]}
              </span>
            )}
          </DeprecatedIconButton>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          className={styles.notificationDropdown}
          data-testid='dropdown-content'>
          <DropdownMenu.Label>
            <div className={styles.dropdownHeader}>
              <span>{t(headerTranslationKey)}</span>
              <span
                className={styles.readAll}
                data-testid='read-all-notifications'
                onClick={handleReadAll}>
                {t('appHeader.notifications.readAll')}
              </span>
            </div>
          </DropdownMenu.Label>
          <div className={styles.optionsWrapper}>
            {!hasNotifications && <EmptyNotifications type={type} />}
            {hasNotifications && (
              <InfiniteScroll
                element='ul'
                hasMore={hasNextPage}
                initialLoad={false}
                loadMore={handleFetch}
                loader={
                  <div key='notification-loader' className={styles.loading}>
                    <SharedLoadingSpinner size='small' />
                  </div>
                }
                pageStart={1}
                threshold={50}
                useWindow={false}>
                {data?.notifications.nodes.map((notification) => (
                  <SingleNotification key={notification.id} notification={notification} />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
