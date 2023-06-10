import geohash from "ngeohash";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

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
  const handleSignin = (args) => {
    const { lat, lon } = args || {};

    if (!lat || !lon) {
      return;
    }

    const hash = geohash.encode(lat, lon, 5);

    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
    }); // big-red-donkey

    let grid = grids[hash];

    if (!grid) {
      grids[hash] = new Set();
      grid = grids[hash];
    }

    grid.add({
      randomName,
    });

    socket.emit("signin", { hash, username: randomName });
  };

  socket.on("signin", handleSignin);
});

httpServer.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
