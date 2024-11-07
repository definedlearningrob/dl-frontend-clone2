import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from '@dc/screens/UserApp/CommonApp/CommonAppRequests/CommonAppRequestsScreen.module.sass';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime, parseDate } from '@shared/utils/date';
import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as EllipseIcon } from '@shared/svg/ellipse_icon.svg';
import { ReactComponent as RefreshIcon } from '@shared/svg/refresh.svg';

type Props = {
  isDataRefreshing: boolean;
  onSync: () => Promise<void>;
  lastSyncedAt?: string | null;
};

export const CommonAppSyncStatus = ({ isDataRefreshing, onSync, lastSyncedAt }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-row justify-between mb-sm items-start'>
      <div>
        <h3 className='text-base xxl:text-lg font-bold text-font-primary mb-xxs leading-base'>
          {t('user.postSecondary.commonAppRequests.title')}
        </h3>
        {lastSyncedAt && (
          <div className='w-100 flex justify-between'>
            <div className='flex gap-xs items-center text-xs leading-lg text-font-secondary me-md'>
              <IconContainer Icon={RefreshIcon} paddingSize='none' size='sm' />
              <p className='m-0'>{t('shared.commonAppDataSync.lastCommonAppRefresh')}</p>
              <IconContainer Icon={EllipseIcon} paddingSize='none' size='xs' />
              <IconContainer Icon={CalendarIcon} paddingSize='none' size='sm' />
              <Tooltip message={formatDateTime(lastSyncedAt, { withTime: true })} side='top'>
                <p className='m-0 leading-sm'>{parseDate(lastSyncedAt)}</p>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
      {lastSyncedAt && (
        <SharedButton
          Icon={RefreshIcon}
          disabled={isDataRefreshing}
          iconClassName={cx({ [styles.rotate]: isDataRefreshing })}
          size='md'
          variant='primary-outlined'
          onClick={onSync}>
          {t('common.actions.refresh')}
        </SharedButton>
      )}
    </div>
  );
};
