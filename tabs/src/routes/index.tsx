import { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';

import { AuthUser } from '../features/auth/types';
import { UserStatus } from '../features/auth/types/user-status.enum';
import { NotFound, Privacy, TermsOfUse, TabConfig } from '../features/misc';
import { useAuth } from '../lib/auth';
import { useNotificationStore, NotificationType } from '../stores/notifications';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const navigateByUserStatus = async (user: AuthUser | null | undefined) => {
    console.log('USER HERE');
    console.log(user);
    if (!user) {
      return navigate('/auth/signin');
    }

    switch (user?.status) {
      case UserStatus.PROVIDE_OWN_NUMBER:
        return navigate('/auth/signup');
      case UserStatus.PROVISION_NUMBER:
        return navigate('/auth/provision-number');
      case UserStatus.ACTIVE:
        return navigate('/inbox');
      case UserStatus.BLOCKED:
        return useNotificationStore.getState().addNotification({
          type: NotificationType.ERROR,
          title: 'Error',
          message: 'Your account is blocked, contact support team for more detailed information',
        });
    }
  };

  useEffect(() => {
    navigateByUserStatus(user);
  }, [user]);

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

  const routes = user && user.status === UserStatus.ACTIVE ? protectedRoutes : publicRoutes;
  console.log(routes);
  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
