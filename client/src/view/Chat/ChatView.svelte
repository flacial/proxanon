<script lang="ts">
  import { getUser } from '../../utils/userdata'

  const user = getUser()

  export let chattingWith: string = ''
  export let chats: { [key: string]: { content: string; owner: string }[] } = {}
</script>

<div class="flex flex-col h-full">
  <div class="w-full p-3 bg-secondaryGray border-b-2 border-b-darkGray">
    <span class="font-display text-2xl text-gray">
      {chattingWith}
    </span>
  </div>
  <ul class="grid gap-2 overflow-auto max-h-[100dvh] pt-3">
    {#each chats[chattingWith] || [] as message}
      <li>
        {#if message.owner === 'me'}
          <li class="bg-[#3D271F] px-3 py-1">
            <span class="font-display text-darkGray text-sm"
              >{user.username}</span
            >
            <p>{message.content}</p>
          </li>
        {:else}
          <li class="bg-secondaryGray px-3 py-1">
            <span>{chattingWith}</span>
            <p>{message.content}</p>
          </li>
        {/if}
      </li>
    {/each}
  </ul>
</div>
