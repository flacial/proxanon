<script lang="ts">
  import { onMount } from 'svelte'
  import io, { Socket } from 'socket.io-client'

  let users = []
  let user: { hash: string; username: string } = JSON.parse(
    localStorage.getItem('user') || '{}'
  )
  let message = ''
  let socket: Socket

  const displayUserInfo = () => {
    if (user.hash && user.username) {
      return `Your hash is ${user.hash} and your username is ${user.username}`
    }

    if (user.hash) {
      return `Your geohash is ${user.hash}`
    }

    return 'You are not signed in ❌'
  }

  onMount(() => {
    if (user) {
      message = displayUserInfo()
    }

    socket = io('http://localhost:3000', {
      query: {
        hash: user?.hash,
        username: user?.username,
      },
    })

    // Listen for the signin event from the server and display the user hash
    socket.on('signin', (data) => {
      const { hash, username } = data

      // Save the user hash in the local storage so that the user doesn't have to sign in again
      localStorage.setItem(
        'user',
        JSON.stringify({
          hash,
          username,
        })
      )

      user = { hash, username }
      message = displayUserInfo()
    })

    socket.on('users', (newUsers) => {
      users = newUsers
    })
  })

  const handleSignIn = () => {
    if (user?.hash) return

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      // Signin the user by emitting the signin event to the server with the user's location data (lat, lon)
      socket.emit('signin', {
        lat,
        lon,
      })
    })
  }

  const handleClearStorage = () => {
    localStorage.clear()
    location.reload()
  }
</script>

<div>
  <button disabled={!!user?.hash} on:click={handleSignIn}
    >{user?.hash ? 'You are signed in' : 'Get your location geohash'}</button
  >
  <button on:click={handleClearStorage}>Clear localStorage</button>
  <p>{message}</p>
  <ul>
    {#each users as proxuser}
      {#if proxuser}
        <li>
          {proxuser} is at {user.hash}
        </li>
      {/if}
    {/each}
  </ul>
</div>
