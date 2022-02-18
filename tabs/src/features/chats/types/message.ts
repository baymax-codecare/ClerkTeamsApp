import { Contact } from './contact';

export type Message = {
  id: string;
  sms: string;
  is_read: boolean;
  sender: Contact;
  is_sent: boolean;
  is_sender_deleted: boolean;
  is_receiver_deleted: boolean;
  receiver: Contact;
  createdAt: string;
  updatedAt: string;
};
