<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { getSocket } from '../../socket'
  import ChatView from './ChatView.svelte'
  import NearbyUsersList from './NearbyUsersList.svelte'
  import { getUser } from '../../utils/userdata'
  import { getChats } from '../../utils/userdata'
  import FriendsImage from '../../lib/assets/illustrations/friends.png'

  const socket = getSocket(null)

  export let gridUsers: string[] = []
  export let chats: { [key: string]: { content: string; owner: string }[] } = {}
  export let chattingWith: string = ''
  export let isLargeScreen: boolean = false

  const handleUesrs = (usersList: string[]) => {
    const previousChats = Object.keys(getChats())
    const filterPreviousChats = usersList.filter((user) => {
      return !previousChats.includes(user) && user !== getUser().username
    })
    gridUsers = filterPreviousChats
  }

  onMount(() => {
    socket.on('users', handleUesrs)
    chats = getChats()
  })
  onDestroy(() => {
    socket.off('users', handleUesrs)
  })
</script>

<section class="h-full" class:p-10={!chattingWith && !isLargeScreen}>
  {#if isLargeScreen}
    <div class="flex h-full">
      <div class="lg:w-96 px-5 py-10">
        <NearbyUsersList bind:chattingWith {gridUsers} />
      </div>
      {#if chattingWith}
        <div class="w-full">
          <ChatView {chattingWith} {chats} />
        </div>
      {:else}
        <div
          class="bg-[#313131] w-full flex flex-col items-center justify-center gap-8 px-10 text-center"
        >
          <img src={FriendsImage} alt="Friends" class="h-[420px]" />
          <span class="font-bold font-display text-2xl">
            Start chatting by pressing "CHAT" next to a user name!
          </span>
        </div>
      {/if}
    </div>
  {:else if chattingWith}
    <ChatView {chattingWith} {chats} />
  {:else}
    <NearbyUsersList bind:chattingWith {gridUsers} />
  {/if}
</section>
