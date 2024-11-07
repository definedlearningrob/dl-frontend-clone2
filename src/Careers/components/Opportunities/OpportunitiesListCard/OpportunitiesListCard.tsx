import { t } from 'i18next';
import cx from 'classnames';

import SharedCard from '@shared/components/Card/Card';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';

import { OpportunitiesList } from '../OpportunitiesList';
import { OpportunityFilters } from '../OpportunityFilters/OpportunityFilters';

import styles from './OpportunitiesListCard.module.sass';

type Props = {
  hasPartners?: boolean;
};

export const OpportunitiesListCard = ({ hasPartners }: Props) => {
  useClearCacheOnUnmount('opportunities');

  return (
    <SharedCard className='xxxl:p-md'>
      <h5 className={cx(styles.title, 'sticky top-sm mb-xxs xxxl:mb-xs')}>
        {t('opportunities.allOpportunities')}
      </h5>
      <p className='relative text-font-secondary pb-sm border-b mb-0 border-neutral-300'>
        {t('opportunities.allOpportunitiesDescription')}
      </p>
      <FilterProvider initialFilters={{}}>
        <OpportunityFilters
          className='pt-base px-base xxxl:px-md -mx-base xxxl:-mx-md mb-base'
          includePartnerFilter={hasPartners}
        />
        <OpportunitiesList />
      </FilterProvider>
    </SharedCard>
  );
};
