import { useParams } from 'react-router-dom';

import { UserDashboardCourses } from '@pbl/components/User/Dashboard/Courses/Courses';
import useDashboardCatalog from '@pbl/graphql/user/hooks/useDashboardCatalog';

import { CatalogCard } from '@shared/components/Catalog';
import { MainContent } from '@shared/components/MainContent/MainContent';

const UserCatalogScreen = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useDashboardCatalog(id);

  return (
    <MainContent className='flex flex-col gap-base xxxl:gap-md'>
      <CatalogCard catalog={data?.catalog} isLoading={loading} />
      <UserDashboardCourses key={id} isCatalogLoading={loading} />
    </MainContent>
  );
};

export default UserCatalogScreen;
