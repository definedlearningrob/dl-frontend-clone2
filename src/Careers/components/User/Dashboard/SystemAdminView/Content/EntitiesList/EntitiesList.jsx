import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import SharedTable from '@dc/shared/Table/Table';
import { EDUCATIONAL_RESOURCE_TYPES, CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';

import '@dc/components/User/Dashboard/EntityAdminView/Tables/EntitiesList/EntitiesList.sass';
import { StageLabel } from '@shared/components/StageLabel';

UserDashboardSystemAdminViewContentEntitiesList.propTypes = {
  currentPage: PropTypes.number,
  entities: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        hierarchyMetrics: PropTypes.shape({
          entitiesCount: PropTypes.number,
          schoolClassesCount: PropTypes.number,
          studentsCount: PropTypes.number,
          teachersCount: PropTypes.number,
        }),
        name: PropTypes.string,
        settings: PropTypes.shape({
          assessmentType: PropTypes.oneOf([
            CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
          ]),
        }),
      })
    ),
    pagesCount: PropTypes.number,
  }),
};

function UserDashboardSystemAdminViewContentEntitiesList({ entities: { nodes } }) {
  const { t } = useTranslation();

  if (!nodes.length)
    return <SharedEmptyContainerPlaceholder message={t('user.dashboard.tables.emptyEntities')} />;

  const tableConstants = () => [
    {
      title: t('user.dashboard.tables.entityName'),
      render: (rowData) => (
        <Link
          className='entity-admin-dashboard-entities__name-container'
          to={`entity-dashboard/${rowData.uuid}`}>
          {rowData.name}
          <StageLabel
            inline={true}
            resourceType={EDUCATIONAL_RESOURCE_TYPES.ENTITY}
            stage={rowData.settings.assessmentType}
          />
        </Link>
      ),
    },
    {
      title: t('user.dashboard.tables.entities'),
      render: (rowData) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.entitiesCount : 0;

        return <span>{value}</span>;
      },
    },
    {
      title: t('user.dashboard.tables.teachers'),
      render: (rowData) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.teachersCount : 0;

        return <span>{value}</span>;
      },
    },
    {
      title: t('user.dashboard.tables.classes'),
      render: (rowData) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.schoolClassesCount : 0;

        return <span>{value}</span>;
      },
    },
    {
      title: t('user.dashboard.tables.students'),
      render: (rowData) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.studentsCount : 0;

        return <span>{value}</span>;
      },
    },
  ];

  return (
    <div className='entity-admin-dashboard-tables__table'>
      <SharedTable>
        <SharedTable.Head cols={tableConstants()} />
        <SharedTable.Body
          className='system-admin-view__table-body'
          cols={tableConstants()}
          data={nodes}
        />
      </SharedTable>
    </div>
  );
}

export default UserDashboardSystemAdminViewContentEntitiesList;
