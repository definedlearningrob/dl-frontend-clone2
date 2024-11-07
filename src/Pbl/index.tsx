/* eslint-disable no-undef */
import { ApolloClient, ApolloProvider, from, ServerError, ServerParseError } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Provider } from 'react-redux';
import { setContext } from '@apollo/client/link/context';

import { getCurrentUser, logout } from '@pbl/services/session';
import { TOKEN_KEY } from '@pbl/resources/constants';
import App from '@pbl/components/App';
import cacheConfig from '@pbl/graphql/cacheConfig';
import store from '@pbl/redux/store';
import { UserInfoProvider } from '@pbl/hooks/useUserInfo';

import { MatomoProviderWrapper } from '@shared/components/MatomoProviderWrapper';
import { appsignal } from '@shared/utils/appSignal';

import 'react-toastify/dist/ReactToastify.css';
import '@pbl/stylesheets/application.sass';
import '@pbl/i18n';

const customFetch = (uri: RequestInfo | URL, options: RequestInit | undefined) => {
  const currentUser = getCurrentUser();
  const resource = currentUser ? (currentUser.type === 'student' ? 'students' : 'users') : 'public';

  return fetch(`${uri}/learning/${resource}/graphql`, options);
};

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_DL_API_HOST}/api`,
  fetch: customFetch,
});

const isServerError = (error: Error | ServerError | ServerParseError): error is ServerError =>
  (error as ServerError).statusCode !== undefined;

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'Service-Name': 'learning',
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  },
}));

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    try {
      appsignal.sendError(new Error(JSON.stringify(graphQLErrors)));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const unauthorizedError =
    networkError && isServerError(networkError) && networkError.statusCode === 401;

  if (unauthorizedError) {
    logout({ noRequest: true });
    window.location.href = (import.meta.env.VITE_PBL_FRONTEND_HOST as string) || '/';
  }
});

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: cacheConfig,
  connectToDevTools: true,
});

const matomoInstanceConfig = {
  urlBase: import.meta.env.VITE_DL_MATOMO_URL,
  siteId: import.meta.env.VITE_DL_MATOMO_SITE_ID,
  linkTracking: false,
};

function Pbl() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Defined Learning</title>
        </Helmet>
      </HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <UserInfoProvider>
            <Router>
              <MatomoProviderWrapper matomoInstanceConfig={matomoInstanceConfig}>
                <App />
              </MatomoProviderWrapper>
            </Router>
          </UserInfoProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default Pbl;
