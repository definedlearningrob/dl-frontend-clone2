import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import AdminRoutes from '@dc/components/Admin/Routes/Routes';
import AppHeader from '@dc/components/AppHeader/AppHeader';
import ContentWrappper from '@dc/layout/ContentWrapper/ContentWrapper';
import Navigation from '@dc/components/Admin/Navigation/Navigation';
import userInfoQuery, { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { ROLES } from '@dc/resources/constants';
import useUserInfo from '@dc/hooks/useUserInfo';
import { DCLogo } from '@dc/shared/DCLogo/DCLogo';

import { Sidebar } from '@shared/components/Sidebar/Sidebar';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';

function AdminApp() {
  const history = useHistory();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { loading } = useQuery(userInfoQuery);

  if (loading) return <SharedLoadingSpinner size='full-screen' />;

  if (userInfo?.role !== ROLES.SYSTEM_ADMIN) {
    history.push('/');

    return null;
  }

  return (
    <div className='admin-app-container' data-testid='admin-app'>
      <ExpandSidebarProvider>
        <PresentationStateProvider>
          <NavigationContextProvider>
            <Sidebar LogoComponent={DCLogo} userInfo={userInfo}>
              <Navigation />
            </Sidebar>
            <ContentWrappper header={<AppHeader />}>
              <AdminRoutes userInfo={userInfo} />
            </ContentWrappper>
          </NavigationContextProvider>
        </PresentationStateProvider>
      </ExpandSidebarProvider>
    </div>
  );
}

export default AdminApp;
