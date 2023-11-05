<button
  on:focus
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  {...$$restProps}
  class="hover:opacity-90 cursor-pointer focus:outline-none focus:ring focus:ring-orange-300 active:opacity-90 {$$restProps.class}"
>
  <slot />
</button>
