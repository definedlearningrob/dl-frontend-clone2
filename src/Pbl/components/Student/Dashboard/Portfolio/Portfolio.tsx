import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PortfolioIllustration } from '@pbl/assets/images/portfolio-ilustration.svg';

import SharedButton from '@shared/components/Button/Button';
import SharedCard from '@shared/components/Card/Card';

import styles from './Portfolio.module.sass';

const StudentDashboardPortfolio = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const redirectToPortfolioPage = () => history.push('/portfolio');

  return (
    <SharedCard className={styles.wrapper}>
      <div className={styles.illustrationWrapper}>
        <PortfolioIllustration className={styles.illustration} />
      </div>
      <div className={styles.body}>
        <h5 className={styles.title}>{t('student.dashboard.portfolio.label')}</h5>
        <SharedButton
          className={styles.button}
          size='sm'
          variant='primary'
          onClick={redirectToPortfolioPage}>
          <span className={styles.description}>{t('student.dashboard.portfolio.button')}</span>
        </SharedButton>
      </div>
    </SharedCard>
  );
};

export default StudentDashboardPortfolio;
