import { isEmpty } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import ASSIGNED_PROJECTS, {
  type TAssignedProjectsData,
  TAssignedProjectVariables,
  TProject,
} from '@pbl/graphql/user/queries/assignedProjects';
import { StatusCell } from '@pbl/components/User/MyProjects/List/StatusCell';
import { DateCell } from '@pbl/components/User/MyProjects/List/DateCell';

import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { Tooltip } from '@shared/components/Tooltip';
import { NewTable, TableColumns } from '@shared/components/NewTable/NewTable';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { UserMyProjectsActions } from '../../Actions/Actions';
import styles from '../List.module.sass';

import { AssignByOtherTeacher } from './AssignByOtherTeacher';

const UserAssignedProjectsList = () => {
  const { data, fetchMore } = useQuery<TAssignedProjectsData, TAssignedProjectVariables>(
    ASSIGNED_PROJECTS,
    {
      variables: { page: 1, perPage: 20 },
    }
  );
  const { t } = useTranslation();
  const history = useHistory();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  useClearCacheOnUnmount('assignedTasks');

  if (!data) return null;

  const redirectToProject = (id: string) => {
    history.push(`/projects/${id}`);
  };

  const tableConstants: TableColumns<TProject> = [
    {
      accessorKey: 'displayName',
      header: t('user.myProjects.projectName'),
      meta: {
        className: 'relative',
      },
      size: isFullHD ? 500 : 280,
      cell: (params) => {
        const requiresGrading = params.row.original.gradingNeeded;

        return (
          <div className='flex items-center gap-xs'>
            <div className='min-w-0 truncate'>
              {requiresGrading && (
                <>
                  <div className='w-xxxs absolute top-0 left-0 bottom-0 bg-secondary-500' />
                  <div className={styles.tag}>{t('user.myProjects.needsReview')}</div>
                </>
              )}
              <Tooltip delayDuration={300} message={params.row.original.displayName}>
                <p className='truncate min-w-0 mb-0 text-primary-500 font-bold text-xs leading-lg'>
                  {params.row.original.displayName}
                </p>
              </Tooltip>
            </div>
            <AssignByOtherTeacher
              isAssignedByOtherTeacher={!params.row.original.isAssignedByUser}
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: t('user.myProjects.status'),
      cell: (params) => <StatusCell status={params.row.original.status} />,
      size: 100,
    },
    {
      accessorKey: 'assignedAt',
      header: t('user.myProjects.lastAssigned'),
      cell: (params) => <DateCell date={params.row.original.assignedAt} />,
      size: 100,
    },
    {
      accessorKey: 'actions',
      header: '',
      size: 50,

      cell: (params) => {
        const isSystemProject = isEmpty(params.row.original.owner);

        return (
          <UserMyProjectsActions
            isAssignedByOtherTeacher={!params.row.original.isAssignedByUser}
            isSystemProject={isSystemProject}
            projectId={params.row.id}
            projectName={params.row.original.name}
          />
        );
      },
    },
  ];

  const handleFetchMore = async (nextPage: number) => {
    await fetchMore({ variables: { page: nextPage, perPage: 20 } });
  };

  return (
    <NewTable
      columns={tableConstants}
      data={data.assignedProjects.nodes}
      fetchMore={handleFetchMore}
      pagesCount={data.assignedProjects.pagesCount}
      onRowClick={redirectToProject}
    />
  );
};
export default UserAssignedProjectsList;
