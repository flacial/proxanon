<script lang="ts">
  export let imgSrc: string = ''
  export let alt: string = ''
  export let active: boolean = true
  export let withState: boolean = true
  export let onClick: () => void = () => {}
</script>

<div class="grid justify-items-center">
  {#if withState}
    <div
      class="w-2 h-2 {active
        ? 'shadow-[0_0_5px_3px_rgba(255,86,29,0.2)] orange-gradient'
        : 'bg-zinc-700'} rounded-full mb-2 transition-shadow"
    />
  {/if}
  <button
    class="p-2 bg-secondaryGray rounded-full w-fit hover:opacity-90 cursor-pointer focus:outline-none focus:ring focus:ring-orange-300 active:opacity-90"
    on:click={onClick}
  >
    <img
      class="filter brightness-75"
      src={imgSrc}
      {alt}
      width="31"
      height="31"
    />
  </button>
</div>
