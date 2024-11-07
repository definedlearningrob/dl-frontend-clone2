import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import MY_PROJECTS, {
  type TMyProjectsData,
  TMyProjectsVariables,
  TProject,
} from '@pbl/graphql/user/queries/myProjects';
import { ArchivableStatusTypes } from '@pbl/resources/enums';
import { StatusCell } from '@pbl/components/User/MyProjects/List/StatusCell';

import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { formatDateTime } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';
import { ContentStatusesTypes } from '@shared/resources/enums';
import { NewTable, TableColumns } from '@shared/components/NewTable/NewTable';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { UserMyProjectsActions } from '../../Actions/Actions';

export const ArchivedProjectsList = () => {
  const { t } = useTranslation();
  const { data, fetchMore } = useQuery<TMyProjectsData, TMyProjectsVariables>(MY_PROJECTS, {
    variables: { scope: ArchivableStatusTypes.ARCHIVED, page: 1, perPage: 20 },
  });
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  useClearCacheOnUnmount('myTasks');

  if (!data) return null;

  const tableConstants: TableColumns<TProject> = [
    {
      accessorKey: 'displayName',
      header: t('user.myProjects.projectName'),
      cell: (params) => (
        <Tooltip delayDuration={300} message={params.row.original.displayName}>
          <p className='truncate min-w-0 mb-0 text-primary-500 font-bold text-xs leading-lg'>
            {params.row.original.displayName}
          </p>
        </Tooltip>
      ),
      size: isFullHD ? 500 : 280,
    },
    {
      accessorKey: 'status',
      header: t('user.myProjects.status'),
      cell: (params) => (
        <StatusCell
          status={
            params.row.original.isArchived
              ? ContentStatusesTypes.ARCHIVED
              : params.row.original.status
          }
        />
      ),
      size: 100,
    },
    {
      accessorKey: 'updatedAt',
      header: t('user.myProjects.customizedDate'),
      cell: (params) => {
        const date = formatDateTime(params.row.original.updatedAt);

        return (
          <Tooltip message={formatDateTime(params.row.original.updatedAt, { withTime: true })}>
            {date}
          </Tooltip>
        );
      },
      size: 100,
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: (params) => {
        const isSystemProject = isEmpty(params.row.original.owner);

        return (
          <UserMyProjectsActions
            isArchived={true}
            isSystemProject={isSystemProject}
            projectId={params.row.original.id}
            projectName={params.row.original.name}
          />
        );
      },
      size: 50,
    },
  ];

  const handleFetchMore = async (nextPage: number) => {
    await fetchMore({
      variables: { page: nextPage, perPage: 20, scope: ArchivableStatusTypes.ARCHIVED },
    });
  };

  return (
    <NewTable
      columns={tableConstants}
      data={data.myProjects.nodes}
      fetchMore={handleFetchMore}
      pagesCount={data.myProjects.pagesCount}
    />
  );
};
