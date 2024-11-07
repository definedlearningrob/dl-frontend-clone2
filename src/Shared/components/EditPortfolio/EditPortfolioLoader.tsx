import { useTranslation } from 'react-i18next';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const EditPortfolioLoader = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full flex flex-col'>
      <header className='w-full pb-sm xxxl:pb-md flex gap-md bg-neutral-200 z-higher sticky pt-base xxxl:pt-md'>
        <div className='w-1/3 flex items-end'>
          <h1 className='text-base xxxl:text-lg mb-0 leading-base'>
            {t('portfolio.editPortfolio')}
          </h1>
        </div>
      </header>
      <div className='flex gap-base xxxl:gap-md w-full'>
        <div className='basis-2/3 !h-[799px]'>
          <SkeletonRectangle
            className='mb-base xxxl:mb-md'
            color='darker'
            height='full-height'
            radius='sm'
            size='full-width'
          />
          <SkeletonRectangle className='!h-[750px]' color='darker' radius='sm' size='full-width' />
        </div>
        <div className='basis-1/3'>
          <SkeletonRectangle
            className='!h-[303px] xxxl:!h-[341px]'
            color='darker'
            radius='sm'
            size='full-width'
          />
        </div>
      </div>
    </div>
  );
};
