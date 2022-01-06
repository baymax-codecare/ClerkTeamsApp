import { Flex } from '@fluentui/react-northstar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '../components/elements';
import { Inbox } from '../features/Inbox';

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <Flex hAlign="center" vAlign="center" fill={true}>
            <Spinner />
          </Flex>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '/inbox', element: <Inbox /> }],
  },
];
