import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';
import { EDUCATIONAL_RESOURCE_TYPES } from '@dc/resources/constants';
import SharedTable from '@dc/shared/Table/Table';

import { TEntity } from '@pbl/graphql/user/queries/systemAdminEntity';

import { StageLabel } from '@shared/components/StageLabel';

import styles from './EntitiesList.module.sass';

type Entity = {
  uuid: string;
  settings: { selfEvaluationEnabled: boolean; assessmentType: string };
  name: string;
  hierarchyMetrics: {
    entitiesCount: number;
    schoolClassesCount: number;
    studentsCount: number;
    teachersCount: number;
  };
};

type EntitiesNodes = {
  nodes: TEntity[];
};

type Props = {
  entities: EntitiesNodes;
};

export const EntitiesList = ({ entities: { nodes } }: Props) => {
  const { t } = useTranslation();
  if (isEmpty(nodes))
    return <SharedEmptyContainerPlaceholder message={t('dashboard.tables.emptyEntities')} />;

  const tableConstants = () => [
    {
      title: t('user.dashboard.tables.entityName'),
      render: (rowData: Entity) => (
        <Link className={styles.nameContainer} to={`entity-dashboard/${rowData.uuid}`}>
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
      render: (rowData: Entity) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.entitiesCount : 0;

        return <span>{value}</span>;
      },
    },
    {
      title: t('user.dashboard.tables.teachers'),
      render: (rowData: Entity) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.teachersCount : 0;

        return <span>{value}</span>;
      },
    },
    {
      title: t('user.dashboard.tables.classes'),
      render: (rowData: Entity) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.schoolClassesCount : 0;

        return <span>{value}</span>;
      },
    },
    {
      title: t('user.dashboard.tables.students'),
      render: (rowData: Entity) => {
        const value = rowData.hierarchyMetrics ? rowData.hierarchyMetrics.studentsCount : 0;

        return <span>{value}</span>;
      },
    },
  ];

  return (
    <div className={styles.table}>
      <SharedTable>
        <SharedTable.Head cols={tableConstants()} />
        <SharedTable.Body cols={tableConstants()} data={nodes} />
      </SharedTable>
    </div>
  );
};
