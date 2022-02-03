import { Provider, teamsTheme, Flex, Loader, Button } from '@fluentui/react-northstar';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Spinner } from '../components/elements';
import { Notifications } from '../components/Notifications';
import { AuthProvider } from '../lib/auth';
import { queryClient } from '../lib/react-query';
import { useTeamsFx } from '../lib/useTeamsFx';

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
      style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexFlow: 'column',
        minHeight: '100vh',
        alignItems: 'center',
      }}
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(`${window.location.origin}/auth/signin`)}
      >
        Refresh
      </Button>
    </div>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { theme, loading } = useTeamsFx();
  // TODO: Check if this application is running on teams,
  // if not shows that this application is only available on teams
  return (
    <React.Suspense
      fallback={
        <Flex vAlign={'center'} hAlign={'center'} fill={true}>
          <Spinner />
        </Flex>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider theme={theme || teamsTheme} styles={{ backgroundColor: '#eeeeee' }}>
          <QueryClientProvider client={queryClient}>
            <Notifications />
            <AuthProvider>
              {loading ? <Loader style={{ margin: 100 }} /> : <Router>{children}</Router>}
            </AuthProvider>
          </QueryClientProvider>
        </Provider>
      </ErrorBoundary>
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
