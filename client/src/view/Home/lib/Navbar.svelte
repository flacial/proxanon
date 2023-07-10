<script lang="ts">
  import NavItem from './NavItem.svelte'

  export let activeNavItem: string = ''

  const navItems = Object.freeze([
    {
      imageName: 'agent.png',
      alt: 'setting',
    },
    {
      imageName: 'friend.png',
      alt: 'chat',
    },
    {
      imageName: 'inbox.png',
      alt: 'post',
    },
  ])
</script>

<nav class="min-h-screen bg-[#202020] w-max px-4 grid items-center">
  <div class="grid gap-5">
    {#each navItems as navItem}
      <NavItem
        imageName={navItem.imageName}
        alt={navItem.alt}
        active={activeNavItem === navItem.alt}
        onClick={() => {}}
      />
    {/each}
  </div>
</nav>
