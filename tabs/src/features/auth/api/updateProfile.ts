import { useMutation } from 'react-query';

import { useAuth } from '../../../lib/auth';
import { axios } from '../../../lib/axios';
import { CaseOfUsing } from '../types/user-case-of-using.enum';
import { UserStatus } from '../types/user-status.enum';

import { MutationConfig } from './../../../lib/react-query';

export type UpdateProfileDTO = {
  data: {
    caseOfUsing?: CaseOfUsing;
    phone?: string;
    status?: UserStatus;
  };
};

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.patch(`/me`, data);
};

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { refetchUser } = useAuth();

  return useMutation({
    onSuccess: () => {
      refetchUser();
    },
    ...config,
    mutationFn: updateProfile,
  });
};
