import { useTranslation } from 'react-i18next';

import notificationEmptyImage from '@shared/assets/images/notification-empty.png';
import { NOTIFICATION_TYPES } from '@shared/resources/constants';

import styles from './EmptyNotifications.module.sass';

type Props = {
  type?: NOTIFICATION_TYPES;
};

export const EmptyNotifications = ({ type }: Props) => {
  const { t } = useTranslation();
  const translationKey =
    type === NOTIFICATION_TYPES.ANNOUNCEMENT
      ? 'appHeader.announcements'
      : 'appHeader.notifications';

  return (
    <div className={styles.emptyState}>
      <img
        alt={styles.emptyStateText}
        className={styles.emptyStateImage}
        src={notificationEmptyImage}
      />
      <p className={styles.emptyStateText}>{t(`${translationKey}.emptyState`)}</p>
    </div>
  );
};
