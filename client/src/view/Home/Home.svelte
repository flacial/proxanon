<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import Navbar from './lib/Navbar.svelte'
  import { NavItemType } from './type/nav'

  const toUpperCase = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

  const initialPath = toUpperCase(window.location.pathname.split('/')[1])

  let activeNavItem: NavItemType = NavItemType[initialPath] || NavItemType.Chat

  const handlePopState = () => {
    const newPath = toUpperCase(window.location.pathname.split('/')[1])
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
  {#if activeNavItem === NavItemType.Chat}
    <div>
      <h1>Chat</h1>
    </div>
  {:else if activeNavItem === NavItemType.Post}
    <h1>Post</h1>
  {:else if activeNavItem === NavItemType.Setting}
    <h1>Setting</h1>
    <!-- {:else}
    <p>Not implemented yet</p> -->
  {/if}
</div>
