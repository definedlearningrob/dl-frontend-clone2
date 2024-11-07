import { useTranslation } from 'react-i18next';

import Card from '@shared/components/Card/Card';
import { useRole } from '@shared/hooks/useRole';

export const NoCheckinQuestionsInGroup = () => {
  const { t } = useTranslation();
  const { isUser } = useRole();

  return (
    <Card className='min-h-[650px] flex flex-col justify-center'>
      <h3 className='!normal-case'>{t('presentation.emptyCheckInGroup')}</h3>
      {isUser && (
        <Card.Body>
          <p className='font-medium'>{t('presentation.noQuestionsInCheckInGroupInfo')} </p>
        </Card.Body>
      )}
    </Card>
  );
};
