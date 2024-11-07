import { useTranslation } from 'react-i18next';

import SharedIcon from '@shared/components/Icon/Icon';
import SharedImage from '@shared/components/Image/Image';
import defaultThumbnail from '@shared/assets/images/privatePortfolioError.png';
import { ReactComponent as DefinedIcon } from '@shared/assets/icons/defined_Logo.svg';
import { MainContent } from '@shared/components/MainContent/MainContent';

export const GuestPortfolioError = () => {
  const { t } = useTranslation();

  return (
    <MainContent className='flex justify-center items-center h-full bg-neutral-200'>
      <div className='p-base xxxl:p-md w-[320px] xxxl:w-[380px] bg-white rounded rounded-sm'>
        <div className='flex pb-sm xxxl:pb-base justify-center'>
          <SharedIcon icon={<DefinedIcon />} />
        </div>

        <div className='flex flex-col items-center text-neutral-800 text-center'>
          <SharedImage alt='Private portfolio' className='pb-base' src={defaultThumbnail} />
          <h6 className='text-xs xxxl:text-sm font-bold leading-base '>
            {t('portfolio.public.errorTitle')}
          </h6>
          <p className='text-xxs xxxl:text-xs font-regular leading-lg'>
            {t('portfolio.public.errorDescription')}
          </p>
        </div>
      </div>
    </MainContent>
  );
};
