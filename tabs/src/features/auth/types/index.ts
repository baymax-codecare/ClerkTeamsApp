export type AuthUser = {
  id: string;
  email: string;
  status: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
