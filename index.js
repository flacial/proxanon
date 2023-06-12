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
  let { hash: userHash } = socket.handshake.query;

  if (userHash) {
    // Join the user to the grid
    socket.join(userHash);

    // Send all users in the grid to the newly connected user
    if (grids[userHash]) {
      io.to(userHash).emit("users", [...grids[userHash]]);
    }
  }

  socket.on(
    "signin",
    handleSignin(socket, grids, (result) => {
      const { hash } = result || {};
      userHash = hash;

      // Send all users in the grid to the newly connected user
      io.to(userHash).emit("users", [...grids[userHash]]);
    })
  );
});

httpServer.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
