import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PortfolioIllustration } from '@dc/images/dashboard_portfolio.svg';

import SharedButton from '@shared/components/Button/Button';
import SharedCard from '@shared/components/Card/Card';

import styles from './Portfolio.module.sass';

function DashboardPortfolio() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleRedirection = () => {
    history.push('/portfolio');
  };

  return (
    <SharedCard className='dashboard-portfolio'>
      <header className={styles.portfolioHeader}>
        <div>
          <h2 className={styles.portfolioHeading}>{t('dashboard.portfolio.heading')}</h2>
          <p className={styles.portfolioSubHeading}>{t('dashboard.portfolio.subHeading')}</p>
        </div>
        <span className={styles.portfolioLink} onClick={handleRedirection}>
          {t('dashboard.portfolio.link')}
        </span>
      </header>
      <div className={styles.portfolioContainer}>
        <div className={styles.portfolioContent}>
          <span className={styles.portfolioText}>{t('dashboard.portfolio.text')}</span>
          <SharedButton
            className={styles.portfolioButton}
            variant='primary'
            onClick={handleRedirection}>
            {t('dashboard.portfolio.button')}
          </SharedButton>
        </div>
        <div className={styles.portfolioIllustrationWrapper}>
          <PortfolioIllustration className={styles.portfolioIllustration} />
        </div>
      </div>
    </SharedCard>
  );
}

export default DashboardPortfolio;
