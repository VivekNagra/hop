export type LoginTypes = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
};

export type UserDetailsTypes = {
  id: string;
  email: string;
  username: string;
  role: string;
};
