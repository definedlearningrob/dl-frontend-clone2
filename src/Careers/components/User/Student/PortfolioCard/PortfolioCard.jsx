import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';

import SharedButton from '@shared/components/Button/Button';

function UserStudentPortfolioCard() {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams();

  const goToPortfolio = () => {
    history.push(`/students/${id}/portfolio`);
  };

  return (
    <Card className='student-portfolio-card'>
      <h3 className='student-portfolio-card__heading'>{t('user.student.portfolioCard.heading')}</h3>
      <p className='student-portfolio-card__description'>
        {t('user.student.portfolioCard.description')}
      </p>
      <SharedButton className='w-full' variant='primary' onClick={goToPortfolio}>
        {t('user.student.portfolioCard.buttonText')}
      </SharedButton>
    </Card>
  );
}

export default UserStudentPortfolioCard;
