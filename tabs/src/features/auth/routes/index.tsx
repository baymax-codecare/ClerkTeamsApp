import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../lib/auth';
import { useNotificationStore, NotificationType } from '../../../stores/notifications';
import { UserStatus } from '../types/user-status.enum';

import { AuthUser } from './../types';
import { ProvisionNumber } from './ProvisionNumber';
import { Signin } from './Signin';
import { Signup } from './Signup';

export const AuthRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const navigateByUserStatus = async (user: AuthUser | null | undefined) => {
    if (!user) return;

    switch (user?.status) {
      case UserStatus.PROVIDE_OWN_NUMBER:
        return navigate('/auth/signup');
      // return <Navigate to="/auth/signup" />;
      case UserStatus.PROVISION_NUMBER:
        return navigate('/auth/provision-number');
      // return <Navigate to="/auth/provision-number" />;
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

  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="provision-number" element={<ProvisionNumber />} />
    </Routes>
  );
};
