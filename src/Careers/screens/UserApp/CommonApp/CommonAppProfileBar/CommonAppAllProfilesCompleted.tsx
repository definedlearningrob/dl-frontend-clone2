import { useTranslation } from 'react-i18next';

import { CommonAppProfileBarDropdown } from '@dc/screens/UserApp/CommonApp/CommonAppProfileBarDropdown';
import { ReactComponent as CommonAppIcon } from '@dc/assets/icons/CommonApp.svg';

import SharedIcon from '@shared/components/Icon/Icon';

import styles from './CommonAppProfileBar.module.sass';

export const CommonAppAllProfilesCompleted = () => {
  const { t } = useTranslation();

  return (
    <div className='flex w-full gap-base'>
      <div className='flex-none'>
        <SharedIcon className={styles.icon} icon={<CommonAppIcon />} />
      </div>
      <div className='flex-auto w-2/3'>
        <h6 className='text-xs mb-xs font-bold'>
          {t('user.postSecondary.commonAppRequests.manageAllApplicationsHeader')}
        </h6>
        <p className='text-xs mb-0 font-regular text-neutral-700'>
          {t('user.postSecondary.commonAppRequests.manageAllApplicationsText')}
        </p>
      </div>
      <div className='flex-auto flex justify-end'>
        <CommonAppProfileBarDropdown />
      </div>
    </div>
  );
};
