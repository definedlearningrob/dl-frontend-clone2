import { useTranslation } from 'react-i18next';

import Card from '@shared/components/Card/Card';

export const NoPresentation = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col justify-center items-center h-full py-base xxxl:py-lg'>
      <Card className=' w-1/3 h-[300px] mx-auto flex flex-col justify-center items-center'>
        <h3>{t('presentation.noPresentation')}</h3>
        <p>{t('presentation.noPresentationInfo')}</p>
      </Card>
    </div>
  );
};
