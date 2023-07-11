<script lang="ts">
  import './app.css'
  import { onMount } from 'svelte'
  import Login from './view/Login.svelte'
  import Home from './view/Home/Home.svelte'
  import { getSocket } from './socket'
  import type { SigninEvArgs } from './type/global'

  let user: { hash?: string; username?: string } = JSON.parse(
    localStorage.getItem('user') || '{}'
  )
  const socket = getSocket(user)

  onMount(() => {
    // Listen for the signin event from the server and display the user hash
    socket.on('signin', (data: SigninEvArgs) => {
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
    })
  })
</script>

<div class="h-screen">
  {#if !user?.hash}
    <Login />
  {:else}
    <Home />
  {/if}
</div>
