<script lang="ts">
  import HelpImage from '../../lib/assets/icons/help.png'
  import EmptyBox from '../../lib/assets/icons/empty-box.png'
  import Button from '../../lib/components/Button.svelte'
  import { parseUsername } from '../../utils/parse'
  import UserCard from './lib/UserCard.svelte'
  import { getChats } from '../../utils/userdata'

  export let gridUsers: string[] = []
  export let chattingWith: string = ''
  const previousChats = Object.keys(getChats())
  console.log(previousChats)
</script>

<div
  class="flex flex-col {!gridUsers.length && !previousChats.length
    ? 'gap-24'
    : 'gap-6'}"
>
  <div>
    <div class="flex justify-between">
      <span class="font-display text-2xl sm:text-3xl text-gray"
        >Nearby Users</span
      >
      <Button
        class="bg-purple-500 filter bg-opacity-20 rounded-full h-fit w-fit p-[3px] sm:scale-125"
      >
        <img src={HelpImage} alt="help" width="21" height="21" />
      </Button>
    </div>
  </div>
  <div class="overflow-auto max-h-[100dvh] pb-40">
    {#if previousChats.length}
      <div class="grid gap-4">
        {#each previousChats as username}
          <UserCard
            username={parseUsername(username)}
            onStartChat={() => (chattingWith = username)}
            {chattingWith}
          />
        {/each}
      </div>
    {/if}
    {#if previousChats.length}
      <hr
        class="w-2/3 border-t-2 opacity-40 rounded-t rounded-b
   m-auto my-6 text-darkGray"
      />
    {/if}
    {#if gridUsers.length}
      <div class="grid gap-4">
        {#each gridUsers as username}
          <UserCard
            username={parseUsername(username)}
            onStartChat={() => (chattingWith = username)}
            {chattingWith}
          />
        {/each}
      </div>
    {/if}
    {#if !gridUsers.length}
      <div class="grid gap-4 justify-items-center">
        <img src={EmptyBox} alt="empty box" class="max-h-40" />
        <span class="text-xl text-red-300 font-display text-center block">
          <span>No users are currently online</span>
          <span>Check later!</span>
        </span>
      </div>
    {/if}
  </div>
</div>
