import { useTranslation } from 'react-i18next';

// import DashboardRecommendedCard from '@dc/components/Dashboard/RecommendedCourses/RecommendedCard/RecommendedCard';
import DashboardCard from '@dc/components/layout/Dashboard/Card/Card';
//TODO: Temporary images for course card
// import temporaryImage from '@dc/images/temp/thumbnail2.jpg';

function DashboardRecommendedCourses() {
  const { t } = useTranslation();

  return (
    <DashboardCard className='dashboard-recommended'>
      <header className='dashboard-recommended__header'>
        <div>
          <h2 className='dashboard-recommended__heading'>{t('dashboard.recommended.heading')}</h2>
          <p className='dashboard-recommended__sub-heading'>
            {t('dashboard.recommended.subHeading')}
          </p>
        </div>
        <span className='dashboard-recommended__link'>{t('dashboard.recommended.link')}</span>
      </header>
      <div className='dashboard-recommended__container'>
        {/* <DashboardRecommendedCard
          categories={[
            'Architecture & Construction',
            'Stem',
          ]}
          image={temporaryImage}
          match={54}
          title='Architecture'
        />
        <DashboardRecommendedCard
          categories={[
            'Architecture & Construction',
            'Stem',
          ]}
          image={temporaryImage}
          match={54}
          title='Architecture'
        />
        <DashboardRecommendedCard
          categories={[
            'Architecture & Construction',
            'Stem',
          ]}
          image={temporaryImage}
          match={54}
          title='Architecture'
        />
        <DashboardRecommendedCard
          categories={[
            'Architecture & Construction',
            'Stem',
          ]}
          image={temporaryImage}
          match={54}
          title='Architecture'
        /> */}
      </div>
    </DashboardCard>
  );
}

export default DashboardRecommendedCourses;
