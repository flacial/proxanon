<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { NavItemType } from './type/nav'
  import Navbar from './lib/Navbar.svelte'
  import Chat from '../Chat/Chat.svelte'
  import { getGridUsers, getUser } from '../../utils/userdata'

  let gridUsers: string[] = []
  let chats: { [key: string]: { content: string; owner: string }[] } = {}
  let chattingWith: string = ''

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const initialPath = capitalize(window.location.pathname.split('/')[1])

  let activeNavItem: NavItemType = NavItemType[initialPath] || NavItemType.Chat

  const handlePopState = () => {
    const newPath = capitalize(window.location.pathname.split('/')[1])
    activeNavItem = NavItemType[newPath] || NavItemType.Chat
  }

  onMount(() => {
    const localGridUsers = getGridUsers()
    gridUsers = localGridUsers.filter((user) => user !== getUser().username)
    window.addEventListener('popstate', handlePopState)
  })

  onDestroy(() => {
    window.removeEventListener('popstate', handlePopState)
  })
</script>

<div class="grid grid-cols-[auto,1fr]">
  <Navbar bind:activeNavItem />
  <div class="bg-[#262626] flex flex-col gap-6 max-h-[100dvh]">
    {#if activeNavItem === NavItemType.Chat}
      <Chat bind:gridUsers bind:chats bind:chattingWith />
    {:else if activeNavItem === NavItemType.Post}
      <h1>Post</h1>
    {:else if activeNavItem === NavItemType.Setting}
      <h1>Setting</h1>
      <!-- {:else}
  <p>Not implemented yet</p> -->
    {/if}
  </div>
</div>
