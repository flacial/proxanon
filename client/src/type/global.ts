export type User = {
  hash?: string;
  username?: string;
};

export type Message = { content: string; owner: string };
export type Chat = Message[];
export type Chats = {
  [key: string]: Chat;
};

export type UserHashes = string[];

export type ChatEventArgs = {
  message: string;
  from: string;
};

export type SigninEvArgs = {
  hash: string;
  username: string;
};
