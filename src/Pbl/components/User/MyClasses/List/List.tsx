import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { useTeacherDashboard } from '@pbl/graphql/user/hooks/useTeacherDashboard';
import { TTeacherSchoolClass } from '@pbl/graphql/user/queries/teacherDashboard';

import SharedTable from '@shared/components/Table/Table';
import TableBodyLoader from '@shared/components/TableBodyLoader/TableBodyLoader';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';

import UserMyClassesActions from '../Actions/Actions';

import styles from './List.module.sass';

function UserMyClassesList() {
  const { userUuid } = useParams<{ userUuid: string }>();
  const { data, loading } = useTeacherDashboard({ userUuid });
  const { t } = useTranslation();
  const history = useHistory();
  useClearCacheOnUnmount('myTasks');

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

  if (loading || !data) {
    return (
      <>
        <SharedTable.Head cols={tableConstants} />
        <div className={styles.loaderContainer}>
          <TableBodyLoader />
        </div>
      </>
    );
  }

  return (
    <>
      <SharedTable.Head cols={tableConstants} />
      <SharedTable.Body cols={tableConstants} data={data.teacherDashboard.schoolClasses} />
    </>
  );
}

export default UserMyClassesList;
