import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './../../../stores/redux/store';

export interface SocketState {
  status: 'connected' | 'disconnected' | 'failed';
  // rooms: string[];
  // activeRoom: string;
  activeReceiverId: string;
  msgToServer: boolean;
}

const initialState: SocketState = {
  status: 'disconnected',
  // rooms: [],
  // activeRoom: '',
  activeReceiverId: '',
  msgToServer: false,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    // addRoom: (state: SocketState, action: PayloadAction<string>) => {
    //   state.rooms.push(action.payload);
    // },
    // removeRoom: (state: SocketState, action: PayloadAction<string>) => {
    //   state.rooms = state.rooms.filter((item) => item !== action.payload);
    // },
    // setupRooms: (state: SocketState, action: PayloadAction<string[]>) => {
    //   state.rooms = action.payload;
    // },
    // setActiveRoom: (state: SocketState, action: PayloadAction<string>) => {
    //   state.activeRoom = action.payload;
    // },
    setActiveReceiverId: (state: SocketState, action: PayloadAction<string>) => {
      state.activeReceiverId = action.payload;
    },
    msgToServerOn: (state: SocketState) => {
      state.msgToServer = true;
    },
    msgToServerOff: (state: SocketState) => {
      state.msgToServer = false;
    },
    // setActiveRoomAndReceiver: (
    //   state: SocketState,
    //   action: PayloadAction<{
    //     activeRoom: string;
    //     activeReceiverId: string;
    //   }>
    // ) => {
    //   state.activeRoom = action.payload.activeRoom;
    //   state.activeReceiverId = action.payload.activeReceiverId;
    // },
  },
});

export const {
  // addRoom,
  // removeRoom,
  // setupRooms,
  // setActiveRoomAndReceiver,
  // setActiveRoom,
  setActiveReceiverId,
  msgToServerOn,
  msgToServerOff,
} = socketSlice.actions;

export const selectStatus = (state: RootState) => state.socket.status;
// export const selectRooms = (state: RootState) => state.socket.rooms;
// export const selectActiveRoom = (state: RootState) => state.socket.activeRoom;
export const selectActiveReceiverId = (state: RootState) => state.socket.activeReceiverId;
export const selectMsgToServer = (state: RootState) => state.socket.msgToServer;
export default socketSlice.reducer;
