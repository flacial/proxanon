<script lang="ts">
  import Button from '../../../lib/components/Button.svelte'
  //   import StatusDot from './StatusDot.svelte'

  export let username: string
  export let onStartChat: (params: unknown) => void
</script>

<div class="bg-secondaryGray px-5 py-3 rounded-lg grid gap-3">
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
  <div class="flex justify-between gap-2">
    <span class="font-body font-bold text-sm text-gray filter brightness-90"
      >{username}</span
    >
    <Button
      class="bg-yellow-400 rounded px-6 text-black font-display text-xs uppercase h-fit"
      on:click={onStartChat}>chat</Button
    >
  </div>
</div>
