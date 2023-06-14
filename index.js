import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSignin } from "./websocket/handlers/signin.handler.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/**
 * @type {Object.<string, Set>}
 */
const grids = {};

app.use(express.json());
app.use(express.static("public"));

const updateUserStatus = (username, hash, status) => {
  if (!grids[hash]) return;

  const gridsSetToArray = Array.from(grids[hash]);
  const user = gridsSetToArray.find((user) => user.username === username);

  if (user) {
    user.online = status;
    grids[hash] = new Set(gridsSetToArray);
  }

  return user;
};

io.on("connection", (socket) => {
  // hash is the geohash of the user's location
  const { hash, username } = socket.handshake.query;

  if (hash) {
    // Join the user to the grid
    socket.join(hash);
    updateUserStatus(username, hash, true);

    if (grids[hash]) {
      // Send a list of users in room[hash] to all connected clients in that room
      io.to(hash).emit("users", [...grids[hash]]);
    }
  }

  socket.on("signin", handleSignin(io, socket, grids));

  socket.on("disconnect", () => {
    if (grids[hash]) {
      updateUserStatus(username, hash, false);
      // Send a list of users in room[hash] to all connected clients in that room
      io.to(hash).emit("users", [...grids[hash]]);
    }
  });
});

httpServer.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
