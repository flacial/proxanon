<script lang="ts">
  import HelpImage from '../../lib/assets/icons/help.png'
  import Button from '../../lib/components/Button.svelte'
  import { getUser } from '../../utils/userdata'
  import UserCard from './lib/UserCard.svelte'

  const user = getUser()

  export let gridUsers: string[] = []
  export let chattingWith: string = ''
</script>

<div class="grid gap-6">
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
    {#each gridUsers as username}
      {#if username !== user.username}
        <UserCard
          username={username.replaceAll('-', ' ')}
          onStartChat={() => (chattingWith = username)}
        />
      {/if}
    {/each}
  </div>
</div>
