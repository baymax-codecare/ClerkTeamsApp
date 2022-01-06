import { useRoutes } from 'react-router-dom';

import { NotFound, Privacy, TermsOfUse, TabConfig } from '../features/misc';
import { useAuth } from '../lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();
  const commonRoutes = [
    {
      path: '/privacy',
      element: <Privacy />,
    },
    {
      path: '/terms-of-use',
      element: <TermsOfUse />,
    },
    {
      path: '/config',
      element: <TabConfig />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
