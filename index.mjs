import express from 'express'
import geohash from 'ngeohash'
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator'

const users = {}
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/api/initial', (req, res) => {
  const { lat, lon } = req.body
  const hash = geohash.encode(lat, lon)

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
  }) // big-red-donkey

  users[randomName] = {
    hash,
  }

  res.send({ hash, username: randomName })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})
