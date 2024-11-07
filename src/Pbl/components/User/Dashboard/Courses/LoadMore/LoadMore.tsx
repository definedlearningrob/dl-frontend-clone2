import { ObservableQueryFields } from '@apollo/client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TDashboardCoursesData,
  TDashboardCoursesVariables,
} from '@pbl/graphql/user/queries/dashboardCourses';
import {
  TDashboardCatalogData,
  TDashboardCatalogVariables,
} from '@pbl/graphql/user/queries/dashboardCatalog';
import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';

import '@pbl/components/User/Dashboard/Courses/Courses.sass';
import styles from './LoadMore.module.sass';

type Props = {
  fetchMore:
    | ObservableQueryFields<
        TDashboardCatalogData | TDashboardCoursesData,
        TDashboardCatalogVariables | TDashboardCoursesVariables
      >['fetchMore']
    | undefined;
  selectedCatalogData: TCatalog;
  pagesCount: number;
};

function UserDashboardCoursesLoadMore({ fetchMore, pagesCount, selectedCatalogData }: Props) {
  const [page, setPage] = useState(2);
  const { t } = useTranslation();
  const hasNextPage = pagesCount > page - 1;

  const variables = selectedCatalogData.id ? { id: selectedCatalogData.id, page } : { page };
  const handleFetchMore = () => {
    fetchMore && fetchMore({ variables });
    setPage(page + 1);
  };

  return hasNextPage ? (
    <button className={styles.button} onClick={handleFetchMore}>
      {t('user.dashboard.showMore')}
    </button>
  ) : null;
}

export default UserDashboardCoursesLoadMore;
