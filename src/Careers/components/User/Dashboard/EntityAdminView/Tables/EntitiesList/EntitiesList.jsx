import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import adminEntitiesQuery from '@dc/graphql/user/queries/adminEntities';
import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import SharedTable from '@dc/shared/Table/Table';
import { EDUCATIONAL_RESOURCE_TYPES } from '@dc/resources/constants';

import '@dc/components/User/Dashboard/EntityAdminView/Tables/EntitiesList/EntitiesList.sass';

import { StageLabel } from '@shared/components/StageLabel';

import EntityAdminTablesSkeleton from '../../Skeleton/Tables/Tables';

UserDashboardEntityAdminViewTablesEntitiesList.propTypes = {
  entityUuid: PropTypes.string,
  filter: PropTypes.shape({ nameCont: PropTypes.string }),
};

function UserDashboardEntityAdminViewTablesEntitiesList({ entityUuid, filter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [listItems, setListItems] = useState();
  const { t } = useTranslation();
  const { data } = useQuery(adminEntitiesQuery, {
    variables: {
      uuid: entityUuid,
      perPage: 50,
      filter: { nameCont: filter.nameCont },
      page: currentPage,
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const entities = useMemo(() => data?.adminDashboard?.entity?.children, [data]);
  const hasNextPage = useMemo(() => entities?.pagesCount > currentPage, [data]);

  const fetchMoreResults = () => {
    hasNextPage && setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (entities) {
      const oldListItems = listItems || [];

      setListItems([...new Set([...oldListItems, ...entities.nodes])]);
    }
  }, [entities]);

  useEffect(() => {
    setListItems(null);
  }, [filter, entityUuid]);

  if (listItems && !listItems.length)
    return <SharedEmptyContainerPlaceholder message={t('user.dashboard.tables.emptyEntities')} />;

  const tableConstants = () => [
    {
      title: t('user.dashboard.tables.entityName'),
      render: (rowData) => (
        <Link
          className='entity-admin-dashboard-entities__name-container'
          to={`/entity-dashboard/${rowData.uuid}`}>
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

  return !listItems ? (
    <EntityAdminTablesSkeleton withoutHeader={true} withoutMargin={true} />
  ) : (
    <div className='entity-admin-dashboard-tables__table'>
      <SharedTable>
        <SharedTable.Head cols={tableConstants()} />
        <SharedTable.Body
          cols={tableConstants()}
          data={listItems}
          fetchMore={fetchMoreResults}
          hasNextPage={hasNextPage}
        />
      </SharedTable>
    </div>
  );
}

export default UserDashboardEntityAdminViewTablesEntitiesList;
