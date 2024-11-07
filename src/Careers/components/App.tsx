import { Suspense, useState, useMemo, useEffect, lazy } from 'react';
import { useHistory } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useSelector } from 'react-redux';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

import { IS_TEST_ENV } from '@dc/resources/constants';
import { ToastContextProvider } from '@dc/context/toastContext';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TRootState } from '@dc/redux/reducers';

import { FeatureProvider } from '@shared/components/FeatureProvider';
import { Toaster } from '@shared/components/Toaster/Toaster';

import DashboardSkeleton from './Dashboard/Skeleton/Skeleton';

const AdminApp = lazy(() => import('@dc/apps/AdminApp'));
const UserApp = lazy(() => import('@dc/apps/UserApp'));
const StudentApp = lazy(() => import('@dc/apps/StudentApp'));
const GuestApp = lazy(() => import('@dc/apps/GuestApp'));

function App() {
  const history = useHistory();
  const { trackPageView: matomoTrackPageView, enableLinkTracking } = useMatomo();
  const [onAdminApp, setOnAdminAppPath] = useState(history.location.pathname.includes('/admin'));
  const { user } = useSelector((state: TRootState) => state.session);
  const { userInfo, loading } = useUserInfo();

  const isStudent = useMemo(() => user?.type === 'student', [user]);

  enableLinkTracking();

  useEffect(() => {
    if (import.meta.env.DEV) {
      loadDevMessages();
      loadErrorMessages();
    }

    let previousPathname = history.location.pathname;

    const unlisten = history.listen((location) => {
      matomoTrackPageView({});
      /**
       * Scrolls to top on every route transition. Solution for:
       */
      if (!IS_TEST_ENV && previousPathname !== location.pathname) {
        window.scrollTo(0, 0);
      }

      if (!location.pathname?.includes('/admin')) {
        setOnAdminAppPath(false);
      }

      if (location.pathname?.includes('/admin')) {
        setOnAdminAppPath(true);
      }

      previousPathname = location.pathname;

      return unlisten;
    });
  }, []);

  const renderUserApp = () => <div data-testid='user-app'>{userInfo && <UserApp />}</div>;

  const renderAdminApp = () => <div data-testid='admin-app'>{userInfo && <AdminApp />}</div>;

  const renderCorrectUserApp = () => (onAdminApp ? renderAdminApp() : renderUserApp());

  const renderStudentApp = () => <div data-testid='student-app'>{userInfo && <StudentApp />}</div>;

  const renderApp = () =>
    user ? (
      {
        user: renderCorrectUserApp(),
        student: renderStudentApp(),
      }[user.type]
    ) : (
      <div data-testid='guest-app'>
        <GuestApp />
      </div>
    );

  return (
    <Suspense fallback={<DashboardSkeleton type={isStudent ? 'STUDENT' : 'USER'} />}>
      <FeatureProvider>
        <div app-type='careers' className='app' data-testid='app'>
          <div id='portal' />
          <Toaster />
          <ToastContextProvider>
            {loading && user ? (
              <DashboardSkeleton type={isStudent ? 'STUDENT' : 'USER'} />
            ) : (
              renderApp()
            )}
          </ToastContextProvider>
        </div>
      </FeatureProvider>
    </Suspense>
  );
}

export default App;
