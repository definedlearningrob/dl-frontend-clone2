/* eslint-disable no-undef */
import algoliasearch from 'algoliasearch';
import { Redirect, Route, Switch } from 'react-router-dom';
import { InstantSearch } from 'react-instantsearch-dom';

import { Navigation } from '@pbl/components/User/Navigation/Navigation';
import ReAuth from '@pbl/components/ReAuth';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { ExpandSidebarProvider } from '@pbl/hooks/useExpandSidebar';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import UserAuthRouter from '@pbl/components/User/AuthRouter/AuthRouter';
import { DLLogo } from '@pbl/components/DLLogo/DLLogo';
import { SharedMiddleware } from '@pbl/components/SharedMiddleware/SharedMiddleware';

import { ProgressBox } from '@shared/components/ProgressBox/ProgressBox';
import { Sidebar } from '@shared/components/Sidebar/Sidebar';
import { MessagingProvider } from '@shared/hooks/useMessaging';
import { SharedSession, SHARED_SESSION_URL_SUFFIX } from '@shared/components/SharedSession';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

const UserApp = () => {
  const { userInfo, refreshUser } = useUserInfo<TUserInfo>();

  const searchClient = algoliasearch(
    (import.meta.env.VITE_ALGOLIA_APP_ID as string) || '',
    userInfo.algoliaSearchKey
  );

  return (
    <Switch>
      <Route component={SharedMiddleware} path='/shared' />
      <Route component={ReAuth} path='/users/auth' />
      <Route component={ReAuth} path='/students/auth' />
      <Route path={SHARED_SESSION_URL_SUFFIX} render={() => <SharedSession type='DL' />} />
      <Route
        path='/sign-in'
        render={() => (userInfo ? <Redirect from='/sign-in' to='/' /> : null)}
      />
      <Route>
        <div className='user-app-container'>
          <InstantSearch
            indexName={(import.meta.env.VITE_ALGOLIA_INDEX as string) || ''}
            searchClient={searchClient}>
            <ExpandSidebarProvider>
              <FileDownloadProvider>
                <PresentationStateProvider>
                  <NavigationContextProvider>
                    <MessagingProvider refreshUser={refreshUser} userInfo={userInfo}>
                      <Sidebar LogoComponent={DLLogo} userInfo={userInfo}>
                        <Navigation />
                      </Sidebar>
                      <UserAuthRouter />
                      <ProgressBox />
                    </MessagingProvider>
                  </NavigationContextProvider>
                </PresentationStateProvider>
              </FileDownloadProvider>
            </ExpandSidebarProvider>
          </InstantSearch>
        </div>
      </Route>
    </Switch>
  );
};

export default UserApp;
