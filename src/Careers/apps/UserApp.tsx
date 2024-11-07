import AppHeader from '@dc/components/AppHeader/AppHeader';
import ContentWrapper from '@dc/layout/ContentWrapper/ContentWrapper';
import DashboardSwitch from '@dc/components/User/DashboardSwitch/DashboardSwitch';
import { Navigation } from '@dc/components/User/Navigation/Navigation';
import UserRoutes from '@dc/components/User/Routes/Routes';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { DCLogo } from '@dc/shared/DCLogo/DCLogo';

import { ProgressBox } from '@shared/components/ProgressBox/ProgressBox';
import { Sidebar } from '@shared/components/Sidebar/Sidebar';
import { MessagingProvider } from '@shared/hooks/useMessaging';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

function UserApp() {
  const { userInfo, refreshUser } = useUserInfo<TUserInfo>();

  return (
    <div className='user-app-container'>
      <ExpandSidebarProvider>
        <FileDownloadProvider>
          <NavigationContextProvider>
            <PresentationStateProvider>
              <MessagingProvider refreshUser={refreshUser} userInfo={userInfo}>
                <Sidebar LogoComponent={DCLogo} userInfo={userInfo}>
                  <>
                    <DashboardSwitch />
                    <Navigation />
                  </>
                </Sidebar>
                <ContentWrapper header={<AppHeader />}>
                  <UserRoutes userInfo={userInfo} />
                </ContentWrapper>
                <ProgressBox />
              </MessagingProvider>
            </PresentationStateProvider>
          </NavigationContextProvider>
        </FileDownloadProvider>
      </ExpandSidebarProvider>
    </div>
  );
}

export default UserApp;
