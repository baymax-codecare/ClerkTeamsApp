import { useQuery } from 'react-query';

import { Message } from '../types/message';

import { axios } from './../../../lib/axios';
import { QueryConfig } from './../../../lib/react-query';

// TODO: implement pagination
export type GetAllMessagesDTO = {
  sender_id: string;
  receiver_id: string;
};

export const getAllMessages = (getAllMessagesDTO: GetAllMessagesDTO): Promise<Message[]> => {
  return axios.get('/messages/all', { params: getAllMessagesDTO });
};

type UseGetAllMessagesOptions = GetAllMessagesDTO & {
  config?: QueryConfig<typeof getAllMessages>;
};

export const useGetAllMessages = ({ sender_id, receiver_id }: UseGetAllMessagesOptions) => {
  return useQuery({
    queryKey: ['allMessages', sender_id, receiver_id],
    queryFn: () => getAllMessages({ sender_id, receiver_id }),
  });
};
