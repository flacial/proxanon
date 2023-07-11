export type User = {
  hash?: string;
  username?: string;
};

export type Users = string[];

export type ChatEventArgs = {
  message: string;
  from: string;
};

export type SigninEvArgs = {
  hash: string;
  username: string;
};
