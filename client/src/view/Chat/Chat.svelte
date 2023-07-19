<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { getSocket } from '../../socket'
  import ChatView from './ChatView.svelte'
  import NearbyUsersList from './NearbyUsersList.svelte'
  import { getChats } from '../../utils/userdata'

  const socket = getSocket(null)

  let gridUsers: string[] = []
  let chattingWith: string = ''
  let chats: { [key: string]: { content: string; owner: string }[] } = {}

  const handleUesrs = (usersList: string[]) => {
    gridUsers = usersList
  }

  onMount(() => {
    socket.on('users', handleUesrs)
    chats = getChats()
  })
  onDestroy(() => {
    socket.off('users', handleUesrs)
  })
</script>

<section class="h-full" class:p-10={!chattingWith}>
  {#if chattingWith}
    <ChatView {chattingWith} {chats} />
  {:else}
    <NearbyUsersList bind:chattingWith {gridUsers} />
  {/if}
</section>
