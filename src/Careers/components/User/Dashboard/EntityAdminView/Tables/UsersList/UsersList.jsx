import cx from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import adminUsersQuery from '@dc/graphql/user/queries/adminUsers';
import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import SharedTable from '@dc/shared/Table/Table';
import userPlansQuery from '@dc/graphql/user/queries/userPlans';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import { ReactComponent as ReportIcon } from '@dc/svg/generate-report.svg';
import { ReportLevels } from '@dc/resources/enums';
import { ROLES } from '@dc/resources/constants';
import '@dc/components/User/Dashboard/EntityAdminView/Tables/UsersList/UsersList.sass';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { Tooltip } from '@shared/components/Tooltip/Tooltip';

import EntityAdminTablesSkeleton from '../../Skeleton/Tables/Tables';

UserDashboardEntityAdminViewTablesUsersList.propTypes = {
  entityUuid: PropTypes.string,
  filter: PropTypes.shape({ fullNameCont: PropTypes.string }),
};

function UserDashboardEntityAdminViewTablesUsersList({ entityUuid, filter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [listItems, setListItems] = useState();
  const [userToReport, setUserToReport] = useState(null);
  const { t } = useTranslation();
  const { data: plansData } = useQuery(userPlansQuery, {
    variables: { uuid: userToReport?.uuid },
    skip: !userToReport,
  });
  const { data } = useQuery(adminUsersQuery, {
    variables: {
      uuid: entityUuid,
      perPage: 50,
      filter: { fullNameCont: filter.fullNameCont },
      page: currentPage,
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const users = useMemo(() => data?.adminDashboard?.entity?.users, [data]);
  const hasNextPage = useMemo(() => users?.pagesCount > currentPage, [data]);
  const plans = plansData?.user.entities.nodes[0].plans;

  const fetchMoreResults = () => {
    hasNextPage && setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (users) {
      const oldListItems = listItems || [];

      setListItems([...new Set([...oldListItems, ...users.nodes])]);
    }
  }, [users]);

  useEffect(() => {
    setListItems(null);
  }, [filter, entityUuid]);

  if (listItems && !listItems.length)
    return <SharedEmptyContainerPlaceholder message={t('user.dashboard.tables.emptyUsers')} />;

  const getRoleFieldConfig = (role) => ({
    text:
      role === ROLES.TEACHER
        ? t('user.dashboard.tables.teacher')
        : t('user.dashboard.tables.admin'),
    className: cx('entity-admin-dashboard-users__role-badge', {
      '-teacher': role === ROLES.TEACHER,
      '-admin': role !== ROLES.TEACHER,
    }),
  });

  const goToEntity = (entity) => () =>
    entity && entity.uuid !== entityUuid && history.push(`/entity-dashboard/${entity.uuid}`);

  const closeReportModal = () => setUserToReport(null);

  const tableConstants = [
    {
      title: t('user.dashboard.tables.name'),
      render: (rowData) => {
        const nameContainerStyles = cx(
          'entity-admin-dashboard-users__name-container',
          rowData.gradingNeeded && '-grading-needed'
        );

        return (
          <div className={nameContainerStyles}>
            <SharedAvatar size='32' user={rowData} />
            <div className='entity-admin-dashboard-users__name'>
              {rowData.gradingNeeded && (
                <span className='entity-admin-dashboard-users__grading-needed'>
                  {t('user.classList.needsReview')}
                </span>
              )}
              {rowData.firstName} {rowData.lastName}
            </div>
          </div>
        );
      },
    },
    {
      title: t('user.dashboard.tables.role'),
      render: (rowData) => (
        <div className={getRoleFieldConfig(rowData.role).className}>
          {getRoleFieldConfig(rowData.role).text}
        </div>
      ),
    },
    {
      title: t('user.dashboard.tables.entities'),
      render: (rowData) => (
        <div className='entity-admin-dashboard-users__entity-container'>
          <span
            className='entity-admin-dashboard-users__entity-parent'
            onClick={goToEntity(rowData.entity.parent)}>
            {rowData.entity.parent?.name}
          </span>
          <span
            className='entity-admin-dashboard-users__entity-name'
            onClick={goToEntity(rowData.entity)}>
            {rowData.entity.name}
          </span>
        </div>
      ),
    },
    {
      title: t('user.dashboard.tables.actions'),
      render: (rowData) => (
        <>
          {rowData.role === ROLES.TEACHER ? (
            <Link
              className='entity-admin-dashboard-users__link'
              to={`/teacher-dashboard/${rowData.uuid}`}>
              {t('user.dashboard.tables.seeClasses')}
            </Link>
          ) : null}
          <Tooltip message={t('user.dashboard.tables.generateReport')}>
            <DeprecatedIconButton
              className='entity-admin-dashboard-users__report-button'
              icon={<ReportIcon />}
              size='sm'
              square={true}
              variant='primary'
              onClick={() => setUserToReport(rowData)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return !listItems ? (
    <EntityAdminTablesSkeleton withoutHeader={true} withoutMargin={true} />
  ) : (
    <div className='entity-admin-dashboard-tables__table -users'>
      <SharedTable>
        <SharedTable.Head cols={tableConstants} />
        <SharedTable.Body
          cols={tableConstants}
          data={listItems}
          fetchMore={fetchMoreResults}
          hasNextPage={hasNextPage}
        />
      </SharedTable>
      {!!userToReport && (
        <UserReportModal
          level={ReportLevels.USER}
          levelUuid={userToReport.uuid}
          plans={plans}
          onClose={closeReportModal}
        />
      )}
    </div>
  );
}

export default UserDashboardEntityAdminViewTablesUsersList;
