import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSignin } from "./websocket/handlers/signin.handler.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

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
    const grid = grids[hash];

    // Join the user to the grid
    socket.join(hash);

    if (grid) {
      grid.add(username);

      // Send a list of users in room[hash] to all connected clients in that room
      io.to(hash).emit("users", [...grid]);
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
    const grid = grids[hash];

    // Remove the disconnected user from the grid
    if (grid) {
      grid.delete(username);
      io.to(hash).emit("users", [...grid]);
    }
  });
});

httpServer.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
