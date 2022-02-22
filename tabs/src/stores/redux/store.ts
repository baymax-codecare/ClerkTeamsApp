import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import socketReducer from '../../features/chats/redux/socket.slice';

export const store = configureStore({
  reducer: {
    socket: socketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
