import { useMutation } from 'react-query';

import { axios } from './../../../lib/axios';
import { MutationConfig, queryClient } from './../../../lib/react-query';
import { Message } from './../types/message';
export type SendMessageDTO = {
  data: {
    sms: string;
    sender_id: string;
    receiver_id: string;
  };
};

export const sendMessage = ({ data }: SendMessageDTO): Promise<Message> => {
  return axios.post('/messages', data);
};

type UseSendMessageOptions = {
  config?: MutationConfig<typeof sendMessage>;
};

export const useSendMessage = ({ config }: UseSendMessageOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      // TODO: refetch new messages
      queryClient.invalidateQueries('allMessages');
    },
    ...config,
    mutationFn: sendMessage,
  });
};
