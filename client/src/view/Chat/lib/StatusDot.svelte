<script lang="ts">
  export let type: 'orange' | 'green' = 'orange'
</script>

{#if type === 'orange'}
  <div
    class="w-2 h-2 shadow-[0_0_5px_3px_rgba(255,86,29,0.2)] orange-gradient rounded-full"
  />
{:else}
  <div
    class="w-2 h-2 shadow-[0_0_5px_3px_rgba(93,255,29,0.2)] green-gradient rounded-full"
  />
{/if}
