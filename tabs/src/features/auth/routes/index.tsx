import { Route, Routes, RouteProps } from 'react-router-dom';

import { ProvisionNumber } from './ProvisionNumber';
import { Signin } from './Signin';
import { Signup } from './Signup';

export const AuthRoutes = (props: RouteProps) => {
  return (
    <Routes {...props}>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="provision-number" element={<ProvisionNumber />} />
    </Routes>
  );
};
