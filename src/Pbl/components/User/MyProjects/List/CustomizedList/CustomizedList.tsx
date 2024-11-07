import { isEmpty } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import MY_PROJECTS, {
  type TMyProjectsData,
  TMyProjectsVariables,
  TProject,
} from '@pbl/graphql/user/queries/myProjects';
import { StatusCell } from '@pbl/components/User/MyProjects/List/StatusCell';
import { ArchivableStatusTypes } from '@pbl/resources/enums';
import { DateCell } from '@pbl/components/User/MyProjects/List/DateCell';

import { Tooltip } from '@shared/components/Tooltip';
import { NewTable, TableColumns } from '@shared/components/NewTable/NewTable';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { UserMyProjectsActions } from '../../Actions/Actions';
import styles from '../List.module.sass';

function UserCustomizedProjectsList() {
  const { data, fetchMore } = useQuery<TMyProjectsData, TMyProjectsVariables>(MY_PROJECTS, {
    variables: { scope: ArchivableStatusTypes.ACTIVE, page: 1, perPage: 20 },
  });
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  useClearCacheOnUnmount('myTasks');

  const { t } = useTranslation();
  const history = useHistory();

  if (!data) return null;

  const handleFetchMore = async (nextPage: number) => {
    await fetchMore({
      variables: {
        page: nextPage + 1,
        scope: ArchivableStatusTypes.ACTIVE,
        perPage: 20,
      },
    });
  };

  const redirectToProject = (projectId: string) => {
    history.push(`/projects/${projectId}`);
  };

  const tableConstants: TableColumns<TProject> = [
    {
      accessorKey: 'displayName',
      header: t('user.myProjects.projectName'),
      meta: {
        className: 'relative',
      },
      cell: (params) => {
        const requiresGrading = params.row.original.gradingNeeded;

        return (
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
        );
      },
      size: isFullHD ? 500 : 280,
    },
    {
      accessorKey: 'status',
      header: t('user.myProjects.status'),
      cell: (params) => <StatusCell status={params.row.original.status} />,
      size: 100,
    },
    {
      accessorKey: 'updatedAt',
      header: t('user.myProjects.lastAssigned'),
      cell: (params) => <DateCell date={params.row.original.updatedAt} />,
      size: 100,
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: (params) => {
        const isSystemProject = isEmpty(params.row.original.owner);

        return (
          <UserMyProjectsActions
            isSystemProject={isSystemProject}
            projectId={params.row.id}
            projectName={params.row.original.name}
          />
        );
      },
      size: 50,
    },
  ];

  return (
    <NewTable
      columns={tableConstants}
      data={data.myProjects.nodes}
      fetchMore={handleFetchMore}
      pagesCount={data.myProjects.pagesCount}
      onRowClick={redirectToProject}
    />
  );
}
export default UserCustomizedProjectsList;
