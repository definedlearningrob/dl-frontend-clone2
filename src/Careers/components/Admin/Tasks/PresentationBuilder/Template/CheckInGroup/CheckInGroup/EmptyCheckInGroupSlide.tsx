import { useTranslation } from 'react-i18next';

import Card from '@shared/components/Card/Card';
import { useRole } from '@shared/hooks/useRole';

export const EmptyCheckInGroupSlide = () => {
  const { t } = useTranslation();
  const { isUser } = useRole();

  return (
    <Card className='min-h-[650px] flex flex-col justify-center'>
      <h3 className='!normal-case'>{t('presentation.noCheckInGroup')}</h3>
      {!isUser && (
        <Card.Body>
          <p className='font-medium'>{t('presentation.noCheckInGroupInfo')} </p>
        </Card.Body>
      )}
    </Card>
  );
};
