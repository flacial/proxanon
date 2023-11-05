<script lang="ts">
  //   import StatusDot from './StatusDot.svelte'

  export let username: string
  export let onStartChat: (params: unknown) => void
  export let chattingWith: string
</script>

<!-- TODO: Fix the stupid ring issue when btn is focused 😭 -->
<button
  class="hover:bg-opacity-75 bg-secondaryGray px-5 py-3 md:py-4 rounded-lg grid gap-3 focus:border-b-orange-300 border-b-2 border-transparent outline-none"
  class:border-b-orange-300={chattingWith.replaceAll('-', ' ') === username}
  on:click={onStartChat}
>
  <!-- <div class=> -->
  <!-- <div class="flex gap-1">
    <div
      class="bg-orange-700 filter bg-opacity-20 rounded px-3 py-[2px] w-fit flex gap-[2px]"
    >
      <StatusDot type="orange" />
      <StatusDot type="orange" />
      <StatusDot type="orange" />
    </div>
    <div
      class="bg-green-700 filter bg-opacity-20 rounded px-3 py-[2px] w-fit flex gap-[2px]"
    >
      <StatusDot type="green" />
    </div>
  </div> -->
  <div class="overflow-hidden text-ellipsis text-left">
    <span
      class="font-display font-bold text-xs md:text-lg text-gray filter brightness-90 max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
      >{username}</span
    >
    <!-- </div> -->
  </div>
</button>
