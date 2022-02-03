//import { lazyImport } from '../utils/lazyImport';

//const { ChatRoutes } = lazyImport(() => import('../features/chats'), 'ChatRoutes');
import { ChatRoutes } from './../features/chats';
export const protectedRoutes = [
  {
    path: '*',
    element: <ChatRoutes />,
    // children: [{ path: '/inbox', element: <Inbox /> }],
  },
];
