import { useTranslation } from 'react-i18next';

import SharedImage from '@shared/components/Image/Image';
import emptyPortfolio from '@shared/assets/images/privatePortfolioEmptyState.svg';
import { MainContent } from '@shared/components/MainContent/MainContent';
export const StudentEmptyPortfolio = () => {
  const { t } = useTranslation();

  return (
    <MainContent className='py-[80px] xxxl:py-[120px] bg-white rounded rounded-sm'>
      <div className='flex flex-col items-center text-neutral-800 text-center'>
        <SharedImage alt='Private portfolio' className='pb-base' src={emptyPortfolio} />
        <h6 className='text-xs xxxl:text-sm font-bold leading-base '>
          {t('portfolio.emptyTitle')}
        </h6>
        <p className='text-xxs xxxl:text-xs font-regular leading-lg'>
          {t('portfolio.emptyPortfolioDescription')}
        </p>
      </div>
    </MainContent>
  );
};
