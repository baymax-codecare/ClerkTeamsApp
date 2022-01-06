import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { Provider, teamsTheme, Flex, Loader } from '@fluentui/react-northstar';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Spinner } from '../components/elements';
import { Notifications } from '../components/Notifications';
import { msalConfig } from '../config';
import { NotFound } from '../features/misc';
import { AuthProvider } from '../lib/auth';
import { queryClient } from '../lib/react-query';
import { useTeamsFx } from '../lib/useTeamsFx';

const ErrorFallback = () => {
  return <NotFound />;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { theme, loading } = useTeamsFx();
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <React.Suspense
      fallback={
        <Flex vAlign={'center'} hAlign={'center'} fill={true}>
          <Spinner />
        </Flex>
      }
    >
      <Provider theme={theme || teamsTheme} styles={{ backgroundColor: '#eeeeee' }}>
        <MsalProvider instance={msalInstance}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
              <Notifications />
              <AuthProvider>
                {loading ? <Loader style={{ margin: 100 }} /> : <Router>{children}</Router>}
              </AuthProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </MsalProvider>
      </Provider>
    </React.Suspense>
  );
  /*
  return (
    <Provider theme={theme || teamsTheme} styles={{ backgroundColor: '#eeeeee' }}>
      <QueryClientProvider client={queryClient}>
        <Notifications />
        <AuthProvider>
          {loading ? <Loader style={{ margin: 100 }} /> : <Router>{children}</Router>}
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );*/
};
