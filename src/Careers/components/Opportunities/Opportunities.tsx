import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { OpportunitiesCarousel } from '@dc/components/Opportunities/OpportunitiesCarousel';

import { ReactComponent as ArrowUpIcon } from '@shared/svg/chevron_up.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';

import { OpportunitiesListCard } from './OpportunitiesListCard';
import styles from './Opportunities.module.sass';
import { FavouriteOpportunitiesList } from './FavouriteOpportunitiesList/FavouriteOpportunitiesList';
import { PartnersList } from './PartnersList/PartnersList';

type Props = {
  hasPartners: boolean;
};

export const Opportunities = ({ hasPartners }: Props) => {
  const { t } = useTranslation();

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <h4 className={styles.opportunitiesHeading}>{t('opportunities.heading')}</h4>
      <div className='flex flex-col gap-base xxxl:gap-md grow'>
        {hasPartners && (
          <div className='flex gap-base xxxl:gap-md h-[412px] xxxl:h-[643px]'>
            <div className='basis-[512px] xxxl:basis-[640px] shrink-0'>
              <FavouriteOpportunitiesList />
            </div>
            <div className='grow'>
              <PartnersList />
            </div>
          </div>
        )}
        {!hasPartners && <OpportunitiesCarousel />}
        <OpportunitiesListCard hasPartners={hasPartners} />
      </div>
      <IconButton
        Icon={ArrowUpIcon}
        circle={true}
        className={styles.scrollTopButton}
        size='md'
        variant='primary'
        onClick={handleScrollToTop}
      />
    </>
  );
};
