import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

import useUserInfo from '@pbl/hooks/useUserInfo';
import dashboardCoursesQuery from '@pbl/graphql/user/queries/dashboardCourses';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';

import Card from '../Card/Card';

type Props = {
  selectedCatalogData: TCatalog;
  setSelectedCatalogData: Dispatch<SetStateAction<TCatalog>>;
  isSingleCard: boolean;
};

const UserDashboardAllCatalogsCard = ({
  selectedCatalogData,
  setSelectedCatalogData,
  isSingleCard,
}: Props) => {
  const { t } = useTranslation();
  const { data } = useQuery(dashboardCoursesQuery, {
    fetchPolicy: 'no-cache',
  });

  const { userInfo } = useUserInfo<TUserInfo>();

  const handleCatalogSelection = () => {
    setSelectedCatalogData((prev) => ({ ...prev, id: '' }));
  };

  return (
    <>
      {data && (
        <Card
          coursesCount={userInfo.availableTracksCount}
          displayName={t('user.dashboard.allCourses')}
          id=''
          isSingleCard={isSingleCard}
          projectsCount={userInfo.availableTasksCount}
          selectedCatalogData={selectedCatalogData}
          tasksCount={data.courses.nodes.tasksCount}
          onClick={handleCatalogSelection}
        />
      )}
    </>
  );
};

export default UserDashboardAllCatalogsCard;
