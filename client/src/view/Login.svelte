<script lang="ts">
  import '../app.css'
  import Binoculars from '../lib/assets/icons/binoculars.svg'
  import { getSocket } from '../socket'

  const socket = getSocket(null)

  let buttonDisabled = false

  const handleSignIn = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      // Signin the user by emitting the signin event to the server with the user's location data (lat, lon)
      socket.emit('signin', {
        lat,
        lon,
      })

      buttonDisabled = true
    })
  }
</script>

<main class="main flex flex-col items-center">
  <span class="text-gray font-display text-6xl">Proxanon</span>
  <div class="mb-8">
    <span>Chat anonymously in</span>
    <img class="inline" src={Binoculars} alt="binoculars icon" />
    <span>proximity</span>
  </div>
  <button
    class="button orange-gradient px-12 py-3 font-medium transition-shadow hover:shadow-2xl hover:shadow-orange-600/50 focus:outline-none focus:ring focus:ring-orange-300 active:opacity-90 disabled:opacity-40 disabled:shadow-none"
    on:click={handleSignIn}
    disabled={buttonDisabled}
  >
    <span class="drop-shadow">Sign in Anonymously</span>
  </button>
</main>

<style>
  .main {
    padding-top: 30vh;
  }
</style>
