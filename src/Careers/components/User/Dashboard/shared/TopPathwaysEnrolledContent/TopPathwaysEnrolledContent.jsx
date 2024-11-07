import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

UserDashboardSharedTopPathwaysEnrolledContent.propTypes = {
  pathwayEnrollmentStats: PropTypes.arrayOf(
    PropTypes.shape({
      pathway: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      studentsCount: PropTypes.number,
    })
  ),
};

function UserDashboardSharedTopPathwaysEnrolledContent({
  pathwayEnrollmentStats: passedStats = [],
}) {
  const { t } = useTranslation();

  const pathwayEnrollmentStats = useMemo(
    () => passedStats.slice().sort((a, b) => b.studentsCount - a.studentsCount),
    [passedStats]
  );

  const stats = useMemo(
    () =>
      pathwayEnrollmentStats.map(({ pathway, studentsCount }) => {
        // stats are return in descending order from BE - 1st record has greatest studentsCount value
        const topValue = pathwayEnrollmentStats[0].studentsCount;
        const barWidth = ((100 * studentsCount) / topValue).toFixed(0);

        return (
          <li
            key={pathway.id}
            className='teacher-dashboard__top-pathways-enrolled__stat'
            data-testid='top-pathways-enrolled-stat'>
            <p className='teacher-dashboard__top-pathways-enrolled__stat-name'>{pathway.name}</p>
            <div
              className='teacher-dashboard__top-pathways-enrolled__stat-bar'
              data-testid='top-pathways-enrolled-stat-bar'
              style={{ width: `${barWidth}%` }}>
              <div className='teacher-dashboard__top-pathways-enrolled__stat-indicator' />
              {studentsCount}
            </div>
          </li>
        );
      }),
    [pathwayEnrollmentStats]
  );

  if (!passedStats.length)
    return (
      <div
        className='teacher-dashboard__top-pathways-enrolled__placeholder'
        data-testid='top-pathways-enrolled-placeholder'>
        {t('user.dashboard.topPathwaysEnrolled.placeholder')}
      </div>
    );

  return (
    <ul className='teacher-dashboard__top-pathways-enrolled__list dashboard-scroll'>{stats}</ul>
  );
}

export default UserDashboardSharedTopPathwaysEnrolledContent;
