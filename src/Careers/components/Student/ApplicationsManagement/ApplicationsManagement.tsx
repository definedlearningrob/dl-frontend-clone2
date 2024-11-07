import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useEffect } from 'react';

import { Applications } from '@dc/components/PostSecondary';
import { INSTITUTION_APPLICATIONS } from '@dc/graphql/student/queries/institutionApplications';
import { CounselorCard } from '@dc/components/Student/ApplicationsManagement/CounselorCard/CounselorCard';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { useSyncCommonAppData } from '@dc/graphql/shared/hooks/useSyncCommonAppData';
// import userInfoQuery from '@dc/graphql/student/queries/userInfo';

import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as EllipseIcon } from '@shared/svg/ellipse_icon.svg';
import { ReactComponent as RefreshIcon } from '@shared/svg/refresh.svg';
import Link from '@shared/components/Link';
import SharedButton from '@shared/components/Button/Button';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { formatDateTime, parseDate } from '@shared/utils/date';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './ApplicationsManagement.module.sass';
import { CommonAppConnectionCard } from './CommonAppConnectionCard';
import { FerpaCard } from './FerpaCard/FerpaCard';

export const ApplicationsManagement = () => {
  const { t } = useTranslation();

  const { userInfo } = useUserInfo<TStudentInfo>();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { setBackNavButton } = useNavigation();

  const { isDataRefreshing, lastSyncedAt, syncCommonAppData } = useSyncCommonAppData([
    INSTITUTION_APPLICATIONS,
    // TODO: uncomment after fixing useUserInfo hook
    // userInfoQuery,
  ]);

  const { hasAccountConnected } = userInfo.commonAppData;

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between mb-sm items-start'>
        <div>
          <h3 className={styles.header}>
            {t('student.postSecondary.applicationsSection.managementHeader')}
          </h3>
          {hasAccountConnected && lastSyncedAt && (
            <div className='flex gap-xs items-center text-xs leading-lg text-font-secondary'>
              <IconContainer Icon={RefreshIcon} paddingSize='none' size='sm' />
              <p className='m-0'>{t('shared.commonAppDataSync.lastCommonAppRefresh')}</p>
              <IconContainer Icon={EllipseIcon} paddingSize='none' size='xs' />
              <IconContainer Icon={CalendarIcon} paddingSize='none' size='sm' />
              <Tooltip message={formatDateTime(lastSyncedAt, { withTime: true })} side='top'>
                <p className='m-0 leading-sm'>{parseDate(lastSyncedAt)}</p>
              </Tooltip>
            </div>
          )}
        </div>
        {hasAccountConnected && (
          <SharedButton
            Icon={RefreshIcon}
            disabled={isDataRefreshing}
            iconClassName={cx({ [styles.rotate]: isDataRefreshing })}
            size='md'
            variant='primary-outlined'
            onClick={syncCommonAppData}>
            {t('common.actions.refresh')}
          </SharedButton>
        )}
      </div>
      <section className='flex flex-grow flex-col gap-sm'>
        <div className='bg-white rounded-sm px-base xxxl:px-md py-xs xxxl:py-sm'>
          <CommonAppConnectionCard />
          <FerpaCard />
          <CounselorCard />
        </div>
        <div className='flex flex-col bg-white rounded-sm min-h-0 flex-grow'>
          <Applications
            actions={
              <Link
                size={isFullHD ? 'md' : 'sm'}
                to='/post-secondary/search'
                variant='primary-outlined'>
                {t('student.postSecondary.applicationsSection.applicationButton')}
              </Link>
            }
          />
        </div>
      </section>
    </div>
  );
};
