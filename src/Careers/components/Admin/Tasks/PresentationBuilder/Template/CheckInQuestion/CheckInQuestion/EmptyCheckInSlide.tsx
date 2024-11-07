import { useTranslation } from 'react-i18next';

import Card from '@shared/components/Card/Card';

export const EmptyCheckInSlide = () => {
  const { t } = useTranslation();

  return (
    <Card className='min-h-[650px] flex flex-col justify-center'>
      <h3 className='!normal-case'>{t('presentation.noCheckInQuestions')}</h3>
      <Card.Body>
        <p className='font-medium'>{t('presentation.noCheckInQuestionsInfo')} </p>
      </Card.Body>
    </Card>
  );
};
