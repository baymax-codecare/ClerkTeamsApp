import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { SOCKET_ENDPOINT } from '../../../config';
import { useAuth } from '../../../lib/auth';
import { queryClient } from '../../../lib/react-query';
import { useAppSelector, useAppDispatch } from '../../../stores/redux/hooks';
import {
  // selectRooms,
  selectMsgToServer,
  // selectActiveRoom,
  msgToServerOff,
} from '../redux/socket.slice';

export const WebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  // const rooms = useAppSelector(selectRooms);
  const msgToServer = useAppSelector(selectMsgToServer);
  // const activeRoom = useAppSelector(selectActiveRoom);
  useEffect(() => {
    // dispatch(connectSocketAsync());
    const newSocket = io(SOCKET_ENDPOINT);
    // dispatch(setSocket(newSocket));
    setSocket(newSocket);
    // TODO: when socket is disconnected, try reconnect
    return () => {
      socket?.close();
    };
  }, [setSocket]);
  if (socket) {
    // for (const room of rooms) {
    //   socket.emit('joinRoom', room);
    // }
    socket.emit('joinRoom', user?.meContact.phoneNumber);
    socket.on('msgToClient', () => {
      queryClient.invalidateQueries('allMessages');
    });
    socket.on('msgToClientRefreshContact', () => {
      queryClient.invalidateQueries('GetContacts');
    });
  }

  if (msgToServer) {
    socket?.emit('msgToServer', { room: user?.meContact.phoneNumber });
    dispatch(msgToServerOff());
  }
  return <></>;
};
