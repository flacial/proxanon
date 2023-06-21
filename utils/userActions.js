import { sockets } from "../state/index.js";

// Add a username and its corresponding socket ID
export const addUser = (grid, username, socketId) => {
  grid.add(username);
  sockets.set(username, socketId);
};

// Remove a username and its corresponding socket ID
export const removeUser = (grid, username) => {
  grid.delete(username);
  sockets.delete(username);
};

// Get the socket ID associated with a username
export const getSocketId = (username) => {
  return sockets.get(username);
};
