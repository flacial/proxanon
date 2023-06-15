import geohash from "ngeohash";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const handleSignin = (io, socket, grids) => (args) => {
  const { lat, lon } = args || {};

  if (!lat || !lon) {
    return;
  }

  const hash = geohash.encode(lat, lon, 5);
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
  }); // big-red-donkey
  const newUser = { hash, username: randomName };

  let grid = grids[hash];

  if (!grid) {
    grids[hash] = new Set();
    grid = grids[hash];
  }

  grid.add(randomName);

  socket.emit("signin", newUser);

  // Join the user to the room[hash]
  socket.join(hash);

  // Send a list of users in room[hash] to all connected clients in that room
  io.to(hash).emit("users", [...grids[hash]]);

  return newUser;
};
