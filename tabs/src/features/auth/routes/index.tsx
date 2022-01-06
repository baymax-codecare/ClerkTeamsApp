import { Route, Routes, RouteProps } from 'react-router-dom';

import { Signin } from './Signin';

export const AuthRoutes = (props: RouteProps) => {
  return (
    <Routes {...props}>
      <Route path="signin" element={<Signin />} />
    </Routes>
  );
};
