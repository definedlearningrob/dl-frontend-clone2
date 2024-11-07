import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { PostSecondaryTile } from '@dc/components/User/PostSecondary/PostSecondaryTile';
import { PostSecondaryImpersonateModal } from '@dc/components/User/PostSecondaryImpersonateModal/PostSecondaryImpersonateModal';

import { ReactComponent as AppIcon } from '@shared/assets/icons/common_app.svg';
import { ReactComponent as SearchIcon } from '@shared/assets/icons/search.svg';
import { ReactComponent as ImpersonateIcon } from '@shared/assets/icons/visible_primary.svg';

import styles from './PostSecondary.module.sass';

export const PostSecondaryContent = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const [isImpersonateModalOpen, toggleImpersonateModalOpen] = useToggle(false);

  const { hasRecommenderInvitation } = userInfo.commonAppData;
  const isCounselor = userInfo.permissions.counselor;
  const { canImpersonate } = userInfo.permissions;
  const hasAccessToImpersonate = !userInfo.isImpersonated && canImpersonate && isCounselor;

  const hasAccessToCommonApp = userInfo.entities.nodes.some(
    (entity) => entity.settings.postSecondaryApplicationsEnabled
  );
  const dashboardInfoKey = hasRecommenderInvitation
    ? 'user.postSecondary.invitedRecommenderDashboardInfo'
    : 'user.postSecondary.counselorDashboardInfo';

  const shouldDisplayCommonAppTile =
    hasAccessToCommonApp && (hasRecommenderInvitation || isCounselor);

  return (
    <div className={styles.container}>
      <div className='text-neutral-800 py-md px-0'>
        <h3 className='font-bold leading-base text-lg text-center mb-sm'>
          {t('user.postSecondary.dashboardTitle')}
        </h3>
        <p className={styles.info}>{t(dashboardInfoKey)}</p>
      </div>
      <div className='flex justify-center items-start gap-base xxxl:gap-md'>
        {shouldDisplayCommonAppTile && (
          <div>
            <Link
              aria-disabled={!hasRecommenderInvitation}
              className={cx({ 'pointer-events-none': !hasRecommenderInvitation })}
              to='/post-secondary/commonapp-requests'>
              <PostSecondaryTile
                Icon={AppIcon}
                disabled={!hasRecommenderInvitation}
                title={t('user.postSecondary.commonAppRequests.title')}
                withCustomImage={true}
              />
            </Link>
            {!hasRecommenderInvitation && (
              <div className='flex mt-sm'>
                <p className='flex-grow w-0 text-xxs leading-lg xxxl:text-xs'>
                  {t('user.postSecondary.commonAppRequestsDisabled')}
                </p>
              </div>
            )}
          </div>
        )}
        <Link to='/post-secondary/search'>
          <PostSecondaryTile Icon={SearchIcon} title={t('user.postSecondary.search')} />
        </Link>
        {hasAccessToImpersonate && (
          <button className='text-primary-500' onClick={toggleImpersonateModalOpen}>
            <PostSecondaryTile
              Icon={ImpersonateIcon}
              title={t('user.postSecondary.loginAsCounselor')}
            />
          </button>
        )}
      </div>
      {isImpersonateModalOpen && (
        <PostSecondaryImpersonateModal onCloseModal={toggleImpersonateModalOpen} />
      )}
    </div>
  );
};
