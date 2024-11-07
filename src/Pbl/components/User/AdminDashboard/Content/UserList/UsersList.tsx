import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';

import userPlansQuery from '@dc/graphql/user/queries/userPlans';
import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import { ROLES } from '@dc/resources/constants';
import SharedTable from '@dc/shared/Table/Table';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import { ReportLevels } from '@dc/resources/enums';

import SharedAvatar from '@shared/components/Avatar/Avatar';

import styles from './UsersList.module.sass';

type RawData = {
  entity: { name: string; uuid: string; parent: { name: string; uuid: string } };
  firstName: string;
  lastName: string;
  gradingNeeded: boolean;
  role: string;
  uuid: string;
  schoolClassesCount: number;
};

type UserNodes = {
  nodes: [];
  pagesCount: string;
};

type Props = {
  users: UserNodes;
  currentPage: string;
};

export const UsersList = ({ currentPage, users: { nodes, pagesCount } }: Props) => {
  const [userToReport, setUserToReport] = useState<RawData | null>(null);
  const { t } = useTranslation();
  const hasNextPage = currentPage < pagesCount;
  const history = useHistory();
  const { data: plansData } = useQuery(userPlansQuery, {
    variables: { uuid: userToReport?.uuid },
    skip: !userToReport,
  });

  if (isEmpty(nodes))
    return <SharedEmptyContainerPlaceholder message={t('user.dashboard.tables.emptyUsers')} />;

  const plans = plansData?.user.entities.nodes[0].plans;

  const getRoleFieldConfig = (role: string) => {
    const whatRole =
      role === ROLES.TEACHER
        ? t('user.dashboard.tables.teacher')
        : t('user.dashboard.tables.admin');

    return {
      text: whatRole,

      className: cx(styles.roleBadge, {
        [styles.teacher]: role === ROLES.TEACHER,
        [styles.admin]: role !== ROLES.TEACHER,
      }),
    };
  };

  const goToEntity = (uuid: string) => () => history.push(`/entity-dashboard/${uuid}`);
  const closeReportModal = () => setUserToReport(null);
  const tableConstants = () => [
    {
      title: t('user.dashboard.tables.name'),
      render: (rowData: RawData) => (
        <div className={styles.nameContainer}>
          <SharedAvatar size='32' user={rowData} />
          <span className={styles.name}>
            {rowData.firstName} {rowData.lastName}
          </span>
        </div>
      ),
    },
    {
      title: t('user.dashboard.tables.role'),
      render: (rowData: RawData) => (
        <div className={getRoleFieldConfig(rowData.role).className}>
          {getRoleFieldConfig(rowData.role).text}
        </div>
      ),
    },
    {
      title: t('user.dashboard.tables.entities'),
      render: (rowData: RawData) => (
        <div className={styles.entityContainer} onClick={goToEntity(rowData.entity.uuid)}>
          <span className={styles.entityParent}>{rowData.entity.parent?.name}</span>
          <span className={styles.entityName}>{rowData.entity.name}</span>
        </div>
      ),
    },
    {
      title: t('user.dashboard.tables.actions'),
      render: (rowData: RawData) => (
        <>
          {rowData.role === ROLES.TEACHER && (
            <Link className='entity-admin-dashboard-users__link' to={`/teacher/${rowData.uuid}`}>
              {t('user.dashboard.tables.seeClasses')}
            </Link>
          )}
        </>
      ),
    },
  ];

  return (
    <div className={styles.tablesTable}>
      <SharedTable>
        <SharedTable.Head cols={tableConstants()} />
        <SharedTable.Body cols={tableConstants()} data={nodes} hasNextPage={hasNextPage} />
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
};
