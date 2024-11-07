import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { ReactComponent as CommonAppIcon } from '@dc/assets/icons/CommonApp.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import Link from '@shared/components/Link';

import styles from './CommonAppSingleProfile.module.sass';

export type CommonAppUserProfileProps = {
  commonAppUserProfile: {
    type: 'counselor' | 'teacher';
    isProfileCompleted: boolean;
    isInvitation: boolean;
    profileTitle: string;
    profileText: string;
    profileLink: string;
  };
  isHorizontal?: boolean;
  isLogo?: boolean;
};

export const CommonAppSingleProfileCompleted = ({
  commonAppUserProfile,
  isHorizontal,
  isLogo = true,
}: CommonAppUserProfileProps) => {
  const { t } = useTranslation();

  const { profileTitle, profileText, profileLink, isProfileCompleted } = commonAppUserProfile;

  const arrowClass = cx('flex w-full', {
    'border-b border-neutral-300 pb-sm': isHorizontal,
  });

  const hasLogoIcon = cx('flex-none', {
    invisible: !isLogo,
  });

  const linkSize = cx('font-regular', styles.linkWidth);

  return (
    <div className='flex w-full gap-base'>
      <div className={hasLogoIcon}>
        <SharedIcon className={styles.icon} icon={<CommonAppIcon />} />
      </div>
      <div className={arrowClass}>
        <div className='flex-auto w-2/3'>
          <h6 className='text-xs mb-xs font-bold'>{profileTitle}</h6>
          <p className='text-xs mb-0 font-regular text-neutral-700'>{profileText}</p>
        </div>
        <div className='flex-auto flex justify-end'>
          <Link
            className={linkSize}
            size='md'
            to={profileLink}
            variant={isProfileCompleted ? 'primary-outlined' : 'primary'}>
            {isProfileCompleted
              ? t('user.postSecondary.commonAppRequests.editProfile')
              : t('user.postSecondary.commonAppRequests.completeProfile')}
          </Link>
        </div>
      </div>
    </div>
  );
};
