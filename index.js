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

io.on("connection", (socket) => {
  // hash is the geohash of the user's location
  let { hash, username } = socket.handshake.query;

  if (hash) {
    // Join the user to the grid
    socket.join(hash);

    if (grids[hash]) {
      grids[hash].add({
        username,
        hash,
      });

      // Send a list of users in room[hash] to all connected clients in that room
      io.to(hash).emit("users", [...grids[hash]]);
    }
  }

  socket.on("signin", (args) => {
    const { hash: newHash, username: newUsername } = handleSignin(
      io,
      socket,
      grids
    )(args);

    // Update parent context's hash & username values
    // by doing so, the other event handlers can use the updated values
    hash = newHash;
    username = newUsername;
  });

  socket.on("disconnect", () => {
    // Remove the disconnected user from the grid
    if (grids[hash]) {
      const gridsSetToArray = Array.from(grids[hash]);
      const user = gridsSetToArray.findIndex(
        (user) => user.username === username
      );

      if (user !== -1) {
        gridsSetToArray.splice(user, 1);
        grids[hash] = new Set(gridsSetToArray);
      }

      io.to(hash).emit("users", [...grids[hash]]);
    }
  });
});

httpServer.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
