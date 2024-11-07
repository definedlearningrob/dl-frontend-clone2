import { isEmpty } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import MY_PROJECTS, {
  type TMyProjectsData,
  TMyProjectsVariables,
  TProject,
} from '@pbl/graphql/user/queries/myProjects';

import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import SharedTable from '@shared/components/Table/Table';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import TableBodyLoader from '@shared/components/TableBodyLoader/TableBodyLoader';
import { useInfiniteQuery } from '@shared/hooks/useInfiniteQuery';

import UserMyProjectsActions from '../../Actions/Actions';
import styles from '../List.module.sass';

const parseDate = (date: string) => dayjs(new Date(date)).format('MM-DD-YYYY');

function UserCustomizedProjectsList() {
  const { data, hasNextPage, loading, onFetchMore } = useInfiniteQuery<
    TMyProjectsData,
    TMyProjectsVariables
  >(MY_PROJECTS);
  useClearCacheOnUnmount('myTasks');

  const customizedActiveProjects = data?.myProjects.nodes.filter(
    (project: TProject) => !project.isArchived
  );

  const { t } = useTranslation();
  const history = useHistory();

  const redirectToProject = (id: string) => {
    history.push(`/lti/project/${id}/product-select`);
  };

  const tableConstants = [
    {
      title: t('user.myProjects.projectName'),
      render: (rowData: TProject) => {
        const redirect = () => redirectToProject(rowData.id);

        return (
          <div>
            <DeprecatedTooltip message={rowData.displayName}>
              <span className={styles.name} role='button' onClick={redirect}>
                {rowData.displayName}
              </span>
            </DeprecatedTooltip>
          </div>
        );
      },
    },
    {
      title: t('user.myProjects.createdOn'),
      render: (rowData: TProject) => {
        const date = parseDate(rowData.createdAt);

        return <span>{date}</span>;
      },
    },
    {
      title: t('user.myProjects.status'),
      render: (rowData: TProject) => <span>{rowData.status}</span>,
    },
    {
      title: '',
      render: (rowData: TProject) => {
        const isSystemProject = isEmpty(rowData.owner);

        return (
          <UserMyProjectsActions
            isSystemProject={isSystemProject}
            projectId={rowData.id}
            projectName={rowData.name}
          />
        );
      },
    },
  ];

  return (
    <>
      <SharedTable.Head className={styles.listHeader} cols={tableConstants} />
      {loading || !customizedActiveProjects ? (
        <TableBodyLoader />
      ) : (
        <SharedTable.Body
          className={styles.listBody}
          cols={tableConstants}
          data={customizedActiveProjects}
          fetchMore={onFetchMore}
          hasNextPage={hasNextPage}
        />
      )}
    </>
  );
}
export default UserCustomizedProjectsList;
