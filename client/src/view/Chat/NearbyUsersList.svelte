<script lang="ts">
  import HelpImage from '../../lib/assets/icons/help.png'
  import EmptyBox from '../../lib/assets/icons/empty-box.png'
  import Button from '../../lib/components/Button.svelte'
  import { parseUsername } from '../../utils/parse'
  import UserCard from './lib/UserCard.svelte'

  export let gridUsers: string[] = []
  export let chattingWith: string = ''
</script>

<div class="grid {!gridUsers.length ? 'gap-24' : 'gap-6'}">
  <div>
    <div class="flex justify-between">
      <span class="font-display text-2xl text-gray">Nearby Users</span>
      <Button
        class="bg-purple-500 filter bg-opacity-20 rounded-full h-fit w-fit p-[3px]"
      >
        <img src={HelpImage} alt="help" width="21" height="21" />
      </Button>
    </div>
  </div>
  <div class="grid gap-4 overflow-auto max-h-[100dvh]">
    {#if !gridUsers.length}
      <div class="grid gap-4 justify-items-center">
        <img src={EmptyBox} alt="empty box" class="max-h-40" />
        <span class="text-xl text-red-300 font-display text-center block">
          <span>No users are currently online</span>
          <span>Check later!</span>
        </span>
      </div>
    {/if}
    {#each gridUsers as username}
      <UserCard
        username={parseUsername(username)}
        onStartChat={() => (chattingWith = username)}
      />
    {/each}
  </div>
</div>
