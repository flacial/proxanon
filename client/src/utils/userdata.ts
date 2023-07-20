// Functions to retrieve and manipulate data in local storage

import type { Chats, Message, User } from "../type/global";

enum Key {
  Chat = "chat",
  User = "user",
}

export const getChats = () => {
  return JSON.parse(localStorage.getItem(Key.Chat) || "{}");
};

export const initChat = (chats: Chats, chatName: string): Chats => {
  if (!chats[chatName]) {
    chats[chatName] = [];
    updateLocalKey(Key.Chat, chats);
  }

  return chats;
};

const updateLocalKey = (item: Key, value: unknown) => {
  return localStorage.setItem(item, JSON.stringify(value));
};

export const getUser: () => User = () => {
  return JSON.parse(localStorage.getItem(Key.User) || "{}");
};

export const storeMessage = (chatName: string, message: Message) => {
  let chats = getChats();

  if (!chats[chatName]) {
    chats = initChat(chats, chatName);
  }

  const chat = chats[chatName];

  chat.push(message);
  updateLocalKey(Key.Chat, chats);

  return chat;
};
