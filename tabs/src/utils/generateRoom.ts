import md5 from 'md5';
export const generateRoomId = (contact1: string, contact2: string): string => {
  const hashInput = contact1 > contact2 ? contact1 + contact2 : contact2 + contact1;
  return md5(hashInput);
};
