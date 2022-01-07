import { axios } from '../../../lib/axios';
import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  token: string;
};

export const loginWithEmailAndToken = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/auth/azure', data);
};
