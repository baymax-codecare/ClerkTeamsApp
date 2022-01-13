import { UserStatus } from './user-status.enum';

export type AuthUser = {
  id: string;
  preferred_username: string;
  status: UserStatus;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
