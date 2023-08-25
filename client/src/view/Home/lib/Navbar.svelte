<script lang="ts">
  import { NavItemType } from '../type/nav'
  import NavItem from './NavItem.svelte'
  import AgentImage from '../../../lib/assets/icons/agent.png'
  import ChatImage from '../../../lib/assets/icons/friend.png'
  import PostImage from '../../../lib/assets/icons/inbox.png'
  import BackImage from '../../../lib/assets/icons/back.png'

  export let activeNavItem: NavItemType
  export let chattingWith: string

  const navItems = Object.freeze([
    {
      src: AgentImage,
      alt: NavItemType.Setting,
    },
    {
      src: ChatImage,
      alt: NavItemType.Chat,
    },
    {
      src: PostImage,
      alt: NavItemType.Post,
    },
  ])

  const handleOnClick = (navItem: NavItemType) => () => {
    activeNavItem = navItem
    history.pushState(null, '', `/${navItem}`)
  }
  const handleBack = () => {
    chattingWith = ''
  }
</script>

<nav class="min-h-screen bg-[#202020] w-max px-4 grid items-center">
  <div class="grid gap-5">
    {#if chattingWith}
      <div class="absolute top-14">
        <NavItem withState={false} imgSrc={BackImage} onClick={handleBack} />
      </div>
    {/if}
    {#each navItems as navItem}
      <NavItem
        imgSrc={navItem.src}
        alt={navItem.alt}
        active={activeNavItem === navItem.alt}
        onClick={handleOnClick(navItem.alt)}
      />
    {/each}
  </div>
</nav>
