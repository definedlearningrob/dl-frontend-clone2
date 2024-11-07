import { lazy, Suspense, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { TRootState } from '@pbl/redux/reducers';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { FeatureProvider } from '@shared/components/FeatureProvider';
import { LtiProvider } from '@shared/components/LtiProvider/LtiProvider';
import { Toaster } from '@shared/components/Toaster/Toaster';

const StudentApp = lazy(() => import('@pbl/apps/StudentApp'));
const UserApp = lazy(() => import('@pbl/apps/UserApp'));
const GuestApp = lazy(() => import('@pbl/apps/GuestApp'));

function App() {
  const { trackPageView, enableLinkTracking } = useMatomo();
  const history = useHistory();

  const { user } = useSelector((state: TRootState) => state.session);
  const { userInfo, loading } = useUserInfo();

  enableLinkTracking();

  useEffect(() => {
    if (import.meta.env.DEV) {
      loadDevMessages();
      loadErrorMessages();
    }

    const unlisten = history.listen(() => {
      trackPageView({});
    });

    return unlisten;
  }, []);

  const renderApp = () =>
    user ? (
      {
        user: (
          <div data-testid='user-app'>
            {userInfo && (
              <LtiProvider ltiDetails={userInfo.ltiDetails}>
                <UserApp />
              </LtiProvider>
            )}
          </div>
        ),
        student: (
          <div data-testid='student-app'>
            {/* TODO we will create different app if there will be need to */}
            {userInfo && (
              <LtiProvider ltiDetails={userInfo.ltiDetails}>
                <StudentApp />
              </LtiProvider>
            )}
          </div>
        ),
      }[user.type]
    ) : (
      <div data-testid='guest-app'>
        <GuestApp />
      </div>
    );

  return (
    <Suspense fallback={<SharedLoadingSpinner size='full-screen' />}>
      <FeatureProvider>
        <div app-type='learning' className='app' data-testid='app'>
          <div id='portal' />
          <Toaster />
          {loading && user ? <SharedLoadingSpinner size='full-screen' /> : renderApp()}
        </div>
      </FeatureProvider>
    </Suspense>
  );
}

export default App;
