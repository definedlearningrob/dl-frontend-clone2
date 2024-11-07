/* eslint-disable no-undef */
import { ApolloClient, ApolloProvider, from, ServerError, ServerParseError } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Provider } from 'react-redux';
import { setContext } from '@apollo/client/link/context';

import App from '@dc/components/App';
import cacheConfig from '@dc/graphql/cacheConfig';
import store from '@dc/redux/store';
import { TOKEN_KEY } from '@dc/resources/constants';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { getCurrentUser, logout } from '@dc/services/session';

import { MatomoProviderWrapper } from '@shared/components/MatomoProviderWrapper';
import { appsignal } from '@shared/utils/appSignal';

import 'react-toastify/dist/ReactToastify.css';
import '@dc/stylesheets/application.sass';
import '@dc/i18n';

const hasCode = window.location.search.match(/code=/);

const customFetch = (uri: RequestInfo | URL, options: RequestInit | undefined) => {
  const currentUser = getCurrentUser();
  const resource = currentUser ? (currentUser.type === 'student' ? 'students' : 'users') : 'public';

  return fetch(`${uri}/${resource}/graphql`, options);
};

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_DC_API_HOST}/api`,
  fetch: customFetch,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'Service-Name': 'careers',
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  },
}));

const isServerError = (error: Error | ServerError | ServerParseError): error is ServerError =>
  (error as ServerError).statusCode !== undefined;

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
    if (graphQLErrors?.[0]?.message === 'revoked token' && hasCode) {
      window.location.reload();
    } else {
      window.location.href = (import.meta.env.VITE_DC_FRONTEND_HOST as string) || '/';
    }
  }
});

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: cacheConfig,
  connectToDevTools: true,
});

const matomoInstanceConfig = {
  urlBase: import.meta.env.VITE_DC_MATOMO_URL,
  siteId: import.meta.env.VITE_DC_MATOMO_SITE_ID,
  linkTracking: false,
};

function Careers() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Defined Careers</title>
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

export default Careers;
