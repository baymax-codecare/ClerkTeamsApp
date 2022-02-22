// import md5 from 'md5';
import { useQuery } from 'react-query';

// import { useAuth } from '../../../lib/auth';
// import { setActiveReceiverId, setActiveRoom, setupRooms } from '../redux/socket.slice';
import { Contact } from '../types/contact';

import { axios } from './../../../lib/axios';
// import { useAppDispatch } from './../../../stores/redux/hooks';

export const getContacts = (): Promise<Contact[]> => {
  return axios.get('/contacts');
};

export const useGetContacts = () => {
  // const { user } = useAuth();
  // const dispatch = useAppDispatch();
  return useQuery({
    queryKey: ['GetContacts'],
    queryFn: () => getContacts(),
    // onSuccess: (contacts) => {
    // Create WebSocket Rooms
    // if (contacts.length <= 0) return;
    // if (!user || !user.bandwidthNumber) return;
    // const bandwidthNumber = user.bandwidthNumber.phoneNumber;

    // const rooms = contacts.map((contact) => contact.phoneNumber);
    // rooms.push(bandwidthNumber);
    // dispatch(setupRooms(rooms));
    // dispatch(setActiveRoom(rooms[0]));
    // dispatch(setActiveReceiverId(contacts[0].id));
    // },
  });
};
