// socket.js
import { io } from "socket.io-client";
import type { User } from "./type/global";
import type { Socket } from "socket.io";

let socket = null;

export const getSocket = (user: User): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      query: {
        hash: user?.hash,
        username: user?.username,
      },
    });
  }
  return socket;
};
