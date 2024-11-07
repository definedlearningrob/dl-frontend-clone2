import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

UserDashboardSharedTopCareerClustersEnrolledContent.propTypes = {
  clusterEnrollmentStats: PropTypes.arrayOf(
    PropTypes.shape({
      cluster: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      studentsCount: PropTypes.number,
    })
  ),
};

function UserDashboardSharedTopCareerClustersEnrolledContent({
  clusterEnrollmentStats: passedStats = [],
}) {
  const { t } = useTranslation();

  const clusterEnrollmentStats = useMemo(
    () => passedStats.slice().sort((a, b) => b.studentsCount - a.studentsCount),
    [passedStats]
  );

  const stats = useMemo(
    () =>
      clusterEnrollmentStats.map(({ cluster, studentsCount }) => {
        // stats are return in descending order from BE - 1st record has greatest studentsCount value
        const topValue = clusterEnrollmentStats[0].studentsCount;
        const barWidth = ((100 * studentsCount) / topValue).toFixed(0);

        return (
          <li
            key={cluster.id}
            className='teacher-dashboard__top-career-clusters-enrolled__stat'
            data-testid='top-career-clusters-enrolled-stat'>
            <p className='teacher-dashboard__top-career-clusters-enrolled__stat-name'>
              {cluster.name}
            </p>
            <div
              className='teacher-dashboard__top-career-clusters-enrolled__stat-bar'
              data-testid='top-career-clusters-enrolled-stat-bar'
              style={{ width: `${barWidth}%` }}>
              <div className='teacher-dashboard__top-career-clusters-enrolled__stat-indicator' />
              {studentsCount}
            </div>
          </li>
        );
      }),
    [clusterEnrollmentStats]
  );

  if (!passedStats.length)
    return (
      <div
        className='teacher-dashboard__top-career-clusters-enrolled__placeholder'
        data-testid='top-career-clusters-enrolled-placeholder'>
        {t('user.dashboard.topCareerClustersEnrolled.placeholder')}
      </div>
    );

  return (
    <ul className='teacher-dashboard__top-career-clusters-enrolled__list dashboard-scroll'>
      {stats}
    </ul>
  );
}

export default UserDashboardSharedTopCareerClustersEnrolledContent;
