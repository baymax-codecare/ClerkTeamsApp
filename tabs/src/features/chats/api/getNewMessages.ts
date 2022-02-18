import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';
import { Message } from '../types/message';

export type GetNewMessagesDTO = {
  lastTimeStamp: string;
  sender_id: string;
  receiver_id: string;
};

export const getNewMessages = (getNewMessagesDTO: GetNewMessagesDTO): Promise<Message[]> => {
  return axios.get('/messages/new', { params: getNewMessagesDTO });
};

type UseGetNewMessagesOptions = GetNewMessagesDTO & {
  config?: QueryConfig<typeof getNewMessages>;
};

export const useGetNewMessages = ({
  lastTimeStamp,
  sender_id,
  receiver_id,
}: UseGetNewMessagesOptions) => {
  return useQuery({
    queryKey: ['newMessages', sender_id, receiver_id, lastTimeStamp],
    queryFn: () => getNewMessages({ lastTimeStamp, sender_id, receiver_id }),
  });
};
