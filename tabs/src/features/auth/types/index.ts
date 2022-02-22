import { Contact } from './../../chats/types/contact';
import { PhoneNumber } from './phone-number';
import { UserStatus } from './user-status.enum';

export type AuthUser = {
  id: string;
  preferredUsername: string;
  status: UserStatus;
  bandwidthNumber: PhoneNumber;
  meContact: Contact;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
