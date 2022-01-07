import { axios } from '../../../lib/axios';
import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => {
  console.log('AUTH ME IS CALLED');
  return axios.get('/auth/me');
};
