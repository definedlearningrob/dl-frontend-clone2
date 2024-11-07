import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import SharedTable from '@dc/shared/Table/Table';
import userPlansQuery from '@dc/graphql/user/queries/userPlans';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import { ReportLevels } from '@dc/resources/enums';
import { ROLES } from '@dc/resources/constants';
import { ReactComponent as ReportIcon } from '@dc/svg/generate-report.svg';
import '@dc/components/User/Dashboard/EntityAdminView/Tables/UsersList/UsersList.sass';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

UserDashboardSystemAdminViewContentUsersList.propTypes = {
  currentPage: PropTypes.number,
  entityUuid: PropTypes.string,
  fetchMore: PropTypes.func,
  setListItems: PropTypes.func,
  users: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        entity: PropTypes.shape({
          name: PropTypes.string,
          parent: PropTypes.shape({
            name: PropTypes.string,
            uuid: PropTypes.uuid,
          }),
          uuid: PropTypes.string,
        }),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        role: PropTypes.string,
        uuid: PropTypes.string,
      })
    ),
    pagesCount: PropTypes.number,
  }),
};

function UserDashboardSystemAdminViewContentUsersList({
  currentPage,
  users: { nodes, pagesCount },
}) {
  const [userToReport, setUserToReport] = useState(null);
  const { t } = useTranslation();
  const hasNextPage = currentPage < pagesCount;
  const history = useHistory();
  const { data: plansData } = useQuery(userPlansQuery, {
    variables: { uuid: userToReport?.uuid },
    skip: !userToReport,
  });

  if (!nodes.length)
    return <SharedEmptyContainerPlaceholder message={t('user.dashboard.tables.emptyUsers')} />;

  const plans = plansData?.user.entities.nodes[0].plans;

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

  const goToEntity = (entity) => () => history.push(`/entity-dashboard/${entity.uuid}`);
  const closeReportModal = () => setUserToReport(null);

  const tableConstants = () => [
    {
      title: t('user.dashboard.tables.name'),
      render: (rowData) => (
        <div className='entity-admin-dashboard-users__name-container'>
          <SharedAvatar size='32' user={rowData} />
          <span className='entity-admin-dashboard-users__name'>
            {rowData.gradingNeeded && (
              <span className='entity-admin-dashboard-users__grading-needed'>
                {t('user.classList.needsReview')}
              </span>
            )}
            {rowData.firstName} {rowData.lastName}
          </span>
        </div>
      ),
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
        <div
          className='entity-admin-dashboard-users__entity-container'
          onClick={goToEntity(rowData.entity)}>
          <span className='entity-admin-dashboard-users__entity-parent'>
            {rowData.entity.parent?.name}
          </span>
          <span className='entity-admin-dashboard-users__entity-name'>{rowData.entity.name}</span>
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
          <DeprecatedTooltip
            className='entity-admin-dashboard-users__tooltip'
            message={t('user.dashboard.tables.generateReport')}
            variant='dark'>
            <DeprecatedIconButton
              className='entity-admin-dashboard-users__report-button'
              icon={<ReportIcon />}
              size='sm'
              square={true}
              variant='primary'
              onClick={() => setUserToReport(rowData)}
            />
          </DeprecatedTooltip>
        </>
      ),
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

export default UserDashboardSystemAdminViewContentUsersList;
