import geohash from "ngeohash";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const handleSignin = (socket, grids, finalCallback) => (args) => {
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
    username: randomName,
    hash,
    status: true,
  });

  socket.emit("signin", { hash, username: randomName });
  socket.join(hash);

  finalCallback?.({ hash, username: randomName });
};
