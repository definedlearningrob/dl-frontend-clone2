import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as OpenInNewIcon } from '@shared/svg/open_in_new.svg';
import Link from '@shared/components/Link';
import { formatExternalLink } from '@shared/utils/formatExternalLink';

import UserMyClassesList from './List/List';
import styles from './MyClasses.module.sass';

const URL = 'https://users.definedlearning.com/manage_classes';

const UserMyClasses = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo>();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const iconSize = isFullHD ? 'md' : 'sm';
  const [entity] = userInfo.entities.nodes;

  const isManagementEnabled = entity.settings.classManagementEnabled;

  return (
    <div className={cx('bg-white rounded-sm h-full flex flex-col', styles.container)}>
      <div className='flex px-base xxxl:px-md pt-base xxxl:pt-md justify-between items-center'>
        <h3 className='mb-0 text-base'>{t('user.myClasses.myClasses')}</h3>
        {isManagementEnabled && (
          <Link
            Icon={OpenInNewIcon}
            className='flex gap-xxs xxxl:gap-xs items-center text-sm xxxl:text-base'
            iconPlacement='end'
            size={iconSize}
            target='_blank'
            to={{ pathname: formatExternalLink(URL) }}
            variant='link'>
            {t('entityInfo.manageClasses')}
          </Link>
        )}
      </div>
      <UserMyClassesList />
    </div>
  );
};

export default UserMyClasses;
