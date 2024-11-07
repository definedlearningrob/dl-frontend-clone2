import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import UserMyClassesActions from '@pbl/components/User/MyClasses/Actions/Actions';
import { useTeacherDashboard } from '@pbl/graphql/user/hooks/useTeacherDashboard';
import styles from '@pbl/components/User/MyClasses/List/List.module.sass';
import { TTeacherSchoolClass } from '@pbl/graphql/user/queries/teacherDashboard';

import SharedTable from '@shared/components/Table/Table';
import TableBodyLoader from '@shared/components/TableBodyLoader/TableBodyLoader';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';

import stylesTable from './ClassList.module.sass';

export const ClassList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { userUuid } = useParams<{ userUuid: string }>();
  useClearCacheOnUnmount('myTasks');
  const { data, loading } = useTeacherDashboard({ userUuid });

  const redirectToSchoolClass = (id: string) => {
    history.push(`/my-classes/${id}`);
  };

  const tableConstants = [
    {
      title: t('user.myClasses.entityClassName'),
      render: (rowData: TTeacherSchoolClass) => {
        const redirect = () => redirectToSchoolClass(rowData.schoolClassUuid);

        return (
          <span className={styles.name} role='button' onClick={redirect}>
            {rowData.schoolClassName}
          </span>
        );
      },
    },
    {
      title: t('user.myClasses.students.label'),
      render: (rowData: TTeacherSchoolClass) => <span>{rowData.studentsCount}</span>,
    },
    {
      title: t('user.myClasses.activeProjects'),
      render: (rowData: TTeacherSchoolClass) => <span>{rowData.currentTasksCount}</span>,
    },
    {
      title: '', //Actions
      render: (rowData: TTeacherSchoolClass) => (
        <UserMyClassesActions uuid={rowData.schoolClassUuid} />
      ),
    },
  ];

  if (!data) {
    return null;
  }

  return (
    <>
      <SharedTable.Head className={stylesTable.tableHead} cols={tableConstants} />
      {loading ? (
        <TableBodyLoader />
      ) : (
        <SharedTable.Body
          className={stylesTable.tableHead}
          cols={tableConstants}
          data={data?.teacherDashboard.schoolClasses}
        />
      )}
    </>
  );
};
