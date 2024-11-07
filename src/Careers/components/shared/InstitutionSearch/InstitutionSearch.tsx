import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { isEmpty } from 'lodash-es';
import cx from 'classnames';

import { ResultsList } from '@dc/shared/InstitutionSearch/ResultsList/ResultsList';
import { InstitutionFilters } from '@dc/shared/InstitutionFilters';
import { useInstitutionFilters } from '@dc/shared/InstitutionFiltersProvider';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';

import styles from './InstitutionSearch.module.sass';

type Props = {
  isTeacher?: boolean;
};

export const InstitutionSearch = ({ isTeacher = false }: Props) => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { filters } = useInstitutionFilters();

  useEffect(() => {
    setBackNavButton(true, '/post-secondary');

    return () => setBackNavButton(false);
  }, []);

  const filterWrapperClasses = cx(
    styles.header,
    'sticky flex gap-sm pb-sm bg-neutral-200 z-lower xxxl:gap-base'
  );

  return (
    <div>
      <h4 className='text-font-primary font-bold text-base xxxl:text-lg'>
        {t('student.institutionSearch.searchSectionTitle')}
      </h4>
      <div className={filterWrapperClasses}>
        <InstitutionFilters showAdditionalFilters={true} triggerType='CHANGE' />
      </div>
      {!isEmpty(filters.searchableColumnsCont) && (
        <div className='bg-white p-xs my-sm inline-flex items-center gap-xs rounded-xs text-xs text-font-secondary'>
          <IconContainer
            Icon={SearchIcon}
            className='bg-info-100 rounded-sm text-primary-500'
            size='sm'
          />
          {t('student.institutionSearch.searchInfo', {
            phrase: filters.searchableColumnsCont,
          })}
        </div>
      )}
      <ResultsList isTeacher={isTeacher} />
    </div>
  );
};
