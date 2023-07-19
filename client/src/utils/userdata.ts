// Functions to retrieve and manipulate data in local storage

import type { Chats, Message, User } from "../type/global";

enum Keys {
  Chat = "chat",
  User = "user",
}

export const getChats = () => {
  return JSON.parse(localStorage.getItem(Keys.Chat) || "{}");
};

export const initChat = (chats: Chats, chatName: string): Chats => {
  if (!chats[chatName]) {
    chats[chatName] = [];
    updateLocalKey(Keys.Chat, JSON.stringify(chats));
  }

  return chats;
};

const updateLocalKey = (item: Keys, value: string) => {
  return localStorage.setItem(item, value);
};

export const getUser: () => User = () => {
  return JSON.parse(localStorage.getItem(Keys.User) || "{}");
};

export const storeMessage = (chatName: string, message: Message) => {
  let chats = getChats();

  if (!chats[chatName]) {
    chats = initChat(chats, chatName);
  }

  const chat = chats[chatName];

  chat.push(message);
  updateLocalKey(Keys.Chat, JSON.stringify(chats));

  return chat;
};
