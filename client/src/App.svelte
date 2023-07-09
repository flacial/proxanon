<script lang="ts">
  import './app.css'
  import { onMount } from 'svelte'
  import io, { Socket } from 'socket.io-client'
  import Login from './view/Login.svelte'
  import Home from './view/Home/Home.svelte'

  let users: string[] = []
  let chats: { [key: string]: { content: string; owner: string }[] } = {}
  let user: { hash?: string; username?: string } = JSON.parse(
    localStorage.getItem('user') || '{}'
  )
  let chattingWith: string = ''
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
    message = displayUserInfo()

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

    socket.on('chat', (data) => {
      const { from, message } = data

      chats[from].push({
        content: message,
        owner: from,
      })
      chats = chats
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

  const handleMessageSend = (e: KeyboardEvent) => {
    const input = e.target as HTMLInputElement

    if (e.key === 'Enter') {
      socket.emit('chat', {
        to: chattingWith,
        message: input.value,
        from: user.username,
      })

      chats[chattingWith].push({
        content: input.value,
        owner: user.username,
      })
      chats = chats

      input.value = ''
    }
  }
</script>

<div class="h-screen">
  {#if !user?.hash}
    <Login />
  {:else if chattingWith}
    <div>
      <ul class="chat">
        {#each chats[chattingWith] as message}
          <li>
            {message.owner === user.username ? 'me' : message.owner}: {message.content}
          </li>
        {/each}
      </ul>
      <input type="text" on:keydown={handleMessageSend} />
    </div>
  {:else}
    <Home />
    <!-- I didn't decide yet what I want to do with the following code -->
    <!-- <button disabled={!!user?.hash} on:click={handleSignIn}
      >{user?.hash ? 'You are signed in' : 'Get your location geohash'}</button
    >
    <button on:click={handleClearStorage}>Clear localStorage</button>
    <p>{message}</p>
    <ul>
      {#each users as proxuser}
        <li class="proxuser">
          {proxuser}
          is at {user.hash}
          <button
            class="ml-5"
            on:click={() => {
              chattingWith = proxuser

              chats[proxuser] = chats[proxuser] ?? []
            }}>Chat</button
          >
        </li>
      {/each}
    </ul> -->
  {/if}
</div>
