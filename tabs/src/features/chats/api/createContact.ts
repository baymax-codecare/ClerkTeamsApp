import { useMutation } from 'react-query';

import { axios } from './../../../lib/axios';
import { MutationConfig, queryClient } from './../../../lib/react-query';
import { Contact } from './../types/contact';
export type CreateContactDTO = {
  data: {
    name: string;
    email?: string;
    isHidden?: boolean;
    phoneNumber: string;
  };
};

export const createContact = ({ data }: CreateContactDTO): Promise<Contact> => {
  return axios.post('/contacts', data);
};

type UseCreateContactOptions = {
  config?: MutationConfig<typeof createContact>;
};

export const useCreateContact = ({ config }: UseCreateContactOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('GetContacts');
    },
    ...config,
    mutationFn: createContact,
  });
};
