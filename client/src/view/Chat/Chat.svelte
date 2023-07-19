<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { getSocket } from '../../socket'
  import ChatView from './ChatView.svelte'
  import NearbyUsersList from './NearbyUsersList.svelte'
  import { getUser } from '../../utils/userdata'

  const socket = getSocket(null)

  export let gridUsers: string[] = []
  export let chats: { [key: string]: { content: string; owner: string }[] } = {}
  export let chattingWith: string = ''

  const handleUesrs = (usersList: string[]) => {
    gridUsers = usersList.filter((user) => user !== getUser().username)
  }

  onMount(() => {
    socket.on('users', handleUesrs)
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
