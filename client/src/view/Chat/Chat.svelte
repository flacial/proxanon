<script lang="ts">
  import HelpImage from '../../lib/assets/icons/help.png'
  import Button from '../../lib/components/Button.svelte'
  import StatusDot from './lib/StatusDot.svelte'
</script>

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
  <div class="bg-secondaryGray px-5 py-3 rounded-lg grid gap-3">
    <!-- Chat card -->
    <div class="flex gap-1">
      <!-- Status badges — Example -->
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
    </div>
    <div class="flex justify-between gap-2">
      <!-- Username and Chatbutton -->
      <span class="font-body font-bold text-sm text-gray filter brightness-90"
        >Awesome Red Hog</span
      >
      <Button
        class="bg-yellow-400 rounded px-6 text-black font-display text-xs uppercase h-fit"
        >chat</Button
      >
    </div>
  </div>
</div>
