<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { NavItemType } from './type/nav'
  import Navbar from './lib/Navbar.svelte'
  import Chat from '../Chat/Chat.svelte'

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const initialPath = capitalize(window.location.pathname.split('/')[1])

  let activeNavItem: NavItemType = NavItemType[initialPath] || NavItemType.Chat

  const handlePopState = () => {
    const newPath = capitalize(window.location.pathname.split('/')[1])
    activeNavItem = NavItemType[newPath] || NavItemType.Chat
  }

  onMount(() => {
    window.addEventListener('popstate', handlePopState)
  })

  onDestroy(() => {
    window.removeEventListener('popstate', handlePopState)
  })
</script>

<div class="grid grid-cols-[auto,1fr]">
  <Navbar bind:activeNavItem />
  <div class="bg-[#262626] p-10 flex flex-col gap-6 max-h-[100dvh]">
    {#if activeNavItem === NavItemType.Chat}
      <Chat />
    {:else if activeNavItem === NavItemType.Post}
      <h1>Post</h1>
    {:else if activeNavItem === NavItemType.Setting}
      <h1>Setting</h1>
      <!-- {:else}
  <p>Not implemented yet</p> -->
    {/if}
  </div>
</div>
