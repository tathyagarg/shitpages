<script lang="ts">
  import ArrowDown from "~icons/mdi/arrow-down";
  import { error_messages, success_messages } from "$lib";

  let { data } = $props();
</script>

{#if data.error}
  <div
    class="p-2 bg-cat-red/50 rounded-md mx-8 border-l-8 border-2 border-cat-red"
  >
    <b>Error: </b>
    <span>{error_messages[data.error]}</span>
  </div>
{/if}
{#if data.success}
  <div
    class="p-2 bg-cat-green/50 rounded-md mx-8 border-l-8 border-2 border-cat-green"
  >
    <b>Success: </b>
    <span>{success_messages[data.success]}</span>
  </div>
{/if}
<section
  class="w-screen h-screen flex flex-col items-center justify-center pointer-events-none"
>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
  >
    <h2 class="font-mono">Get a <i>free</i> subdomain on</h2>
    <h1 class="text-7xl m-4">
      <code
        class="bg-cat-mantle px-4 py-2 rounded-xl text-shadow-glow animate-twinkle"
        >diddler.party</code
      >
    </h1>
    <h2 class="font-mono">to host your static websites</h2>
  </div>

  <ArrowDown
    class="min-h-16 min-w-16 bg-cat-mantle rounded-full absolute bottom-5 border-2 border-cat-text animate-bounce"
  ></ArrowDown>
</section>
<section class="h-screen w-screen"></section>
