import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { InstitutionFilters } from '@dc/shared/InstitutionFilters';
import { useInstitutionFilters } from '@dc/shared/InstitutionFiltersProvider';

import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import Link from '@shared/components/Link';

import styles from './Search.module.sass';

export const Search = () => {
  const { t } = useTranslation();
  const isDesktop = useBreakpointUp({ breakpoint: 'xxl' });
  const { filtersAsQuery } = useInstitutionFilters();

  const searchButtonWrapperClassname = cx(styles.searchButtonWrapper);
  const searchButtonClassname = cx(styles.searchButton, { [styles.iconMode]: !isDesktop });

  return (
    <>
      <h5 className={styles.heading}>{t('student.postSecondary.searchSection.heading')}</h5>
      <p className={styles.description}>{t('student.postSecondary.searchSection.description')} </p>
      <form className='flex items-end gap-sm xxxl:gap-base'>
        <InstitutionFilters debounceTime={100} triggerType='CLICK' />
        <div className={searchButtonWrapperClassname}>
          <Tooltip
            delayDuration={400}
            disabled={isDesktop}
            message={t('student.postSecondary.searchSection.searchButton')}>
            <Link
              className={searchButtonClassname}
              size='md'
              to={{ pathname: 'post-secondary/search', search: filtersAsQuery }}
              type='submit'
              variant='primary'>
              {isDesktop ? (
                t('student.postSecondary.searchSection.searchButton')
              ) : (
                <SharedIcon className='button__icon' icon={<SearchIcon />} size='sm' />
              )}
            </Link>
          </Tooltip>
        </div>
      </form>
    </>
  );
};
