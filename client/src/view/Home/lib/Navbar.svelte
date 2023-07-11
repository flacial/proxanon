<script lang="ts">
  import { NavItemType } from '../type/nav'
  import NavItem from './NavItem.svelte'

  export let activeNavItem: NavItemType

  const navItems = Object.freeze([
    {
      imageName: 'agent.png',
      alt: NavItemType.Setting,
    },
    {
      imageName: 'friend.png',
      alt: NavItemType.Chat,
    },
    {
      imageName: 'inbox.png',
      alt: NavItemType.Post,
    },
  ])

  const handleOnClick = (navItem: NavItemType) => () => {
    activeNavItem = navItem
    history.pushState(null, '', `/${navItem}`)
  }
</script>

<nav class="min-h-screen bg-[#202020] w-max px-4 grid items-center">
  <div class="grid gap-5">
    {#each navItems as navItem}
      <NavItem
        imageName={navItem.imageName}
        alt={navItem.alt}
        active={activeNavItem === navItem.alt}
        onClick={handleOnClick(navItem.alt)}
      />
    {/each}
  </div>
</nav>
