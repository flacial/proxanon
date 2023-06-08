import express from "express";
import geohash from "ngeohash";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

/**
 * @type {Object.<string, Set>}
 */
const grids = {};
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/initial", (req, res) => {
  const { lat, lon } = req.body;
  // geohash of length 5 is <= 4.89km X 4.89km
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

  res.status(200).send({ hash, username: randomName });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
