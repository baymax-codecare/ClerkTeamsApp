import { useMutation } from 'react-query';

import { useAuth } from '../../../lib/auth';
import { axios } from '../../../lib/axios';

import { MutationConfig } from './../../../lib/react-query';
import { PhoneNumber } from './../types/phone-number';

export type CreateNumberDTO = {
  data: {
    number: string;
  };
};

export const createNumber = ({ data }: CreateNumberDTO): Promise<[PhoneNumber]> => {
  return axios.post('/numbers', data);
};

type UseCreateNumberOptions = {
  config?: MutationConfig<typeof createNumber>;
};

export const useCreateNumber = ({ config }: UseCreateNumberOptions = {}) => {
  const { refetchUser } = useAuth();

  return useMutation({
    onSuccess: () => {
      refetchUser();
    },
    ...config,
    mutationFn: createNumber,
  });
};
