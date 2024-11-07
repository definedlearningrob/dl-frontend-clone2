import React from 'react';
import HttpsRedirect from 'react-https-redirect';
import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from '@appsignal/react';

import '@shared/stylesheets/app.css';
// Those styles imports are to resolve CSS import ordering problem
import '@shared/components/Avatar/Avatar.sass';
import '@shared/components/Button/Button.sass';
import '@shared/components/Checkbox/Checkbox.sass';
import '@shared/components/DeprecatedIconButton/DeprecatedIconButton.sass';
import '@shared/components/LoadingSpinner/LoadingSpinner.sass';
import '@shared/components/DeprecatedTooltip/DeprecatedTooltip.sass';
import { appsignal } from '@shared/utils/appSignal';
import LoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

const LazyCareers = lazy(() => import('@dc/index'));
const LazyPbl = lazy(() => import('@pbl/index'));

const renderLazyApp = () => {
  if (window.location.host.split('.')[0] === import.meta.env.VITE_DC_DOMAIN) {
    return <LazyCareers />;
  }
  if (window.location.host.split('.')[0] === import.meta.env.VITE_PBL_DOMAIN) {
    return <LazyPbl />;
  }
};

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary instance={appsignal}>
      <HttpsRedirect>
        <Suspense fallback={<LoadingSpinner size='full-screen' />}>{renderLazyApp()}</Suspense>
      </HttpsRedirect>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
