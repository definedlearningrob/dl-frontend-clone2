import { Trans, useTranslation } from 'react-i18next';

import { ReactComponent as HeartIcon } from '@shared/svg/heart-outline.svg';
import { ReactComponent as EmptyCollege } from '@shared/assets/images/emptyCollege.svg';

export const EmptyFavorites = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center content-center text-center h-100 py-sm'>
      <EmptyCollege className='mb-sm' />
      <h5 className='mb-sm'>{t('student.postSecondary.favoritesSection.emptyInfo')}</h5>
      <span className='text-xs inline-flex items-center justify-center font-regular leading-lg'>
        <Trans
          components={{
            heartIcon: <HeartIcon className='text-danger-500 h-sm w-sm relative inline m-xxs' />,
          }}
          i18nKey='student.postSecondary.favoritesSection.emptyInfoDetails'
        />
      </span>
    </div>
  );
};
