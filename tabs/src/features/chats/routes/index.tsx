import { Routes, Route } from 'react-router-dom';

import { Inbox } from './Inbox';

export const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="/inbox" element={<Inbox />} />
    </Routes>
  );
};
