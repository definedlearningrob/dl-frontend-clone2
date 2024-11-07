import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { Applications, Favorites, FutureChecklist, Search } from '@dc/components/PostSecondary/';

import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './PostSecondaryContent.module.sass';

type Props = { applicationsEnabled: boolean };

export const PostSecondaryContent = ({ applicationsEnabled }: Props) => {
  const { t } = useTranslation();
  const contentClassName = cx(styles.content, {
    [styles.applicationsEnabled]: applicationsEnabled,
  });
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const favoritesSectionClassname = cx(styles.favoritesSection, {
    [styles.verticalList]: !applicationsEnabled,
  });

  return (
    <div className={contentClassName}>
      <div className={styles.searchSection}>
        <Search />
      </div>
      <div className={styles.futureListSection}>
        <FutureChecklist showAdditionalContent={applicationsEnabled} />
      </div>
      <div className={favoritesSectionClassname}>
        <Favorites isCarousel={applicationsEnabled} />
      </div>
      {applicationsEnabled && (
        <div className={styles.applicationsSection}>
          <Applications
            actions={
              <Link
                size={isFullHD ? 'md' : 'sm'}
                to='/post-secondary/manage-applications'
                variant='primary-outlined'>
                {t('student.postSecondary.applicationsSection.manageApplications')}
              </Link>
            }
          />
        </div>
      )}
    </div>
  );
};
