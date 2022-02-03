import { Route, Routes } from 'react-router-dom';

import { BringNumber } from './BringNumber';
import { NewNumber } from './NewNumber';
import { ProvisionNumber } from './ProvisionNumber';
import { Signin } from './Signin';
import { Signup } from './Signup';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/provision-number" element={<ProvisionNumber />} />
      <Route path="/new-number" element={<NewNumber />} />
      <Route path="/bring-number" element={<BringNumber />} />
    </Routes>
  );
};
