<script lang="ts">
  import "../app.css";

  import Navbar from "$lib/components/Navbar.svelte";

  let { children } = $props();
</script>

<div
  class="min-h-screen min-w-screen overflow-x-hidden bg-cat-base font-default text-cat-text"
>
  <Navbar />
  {@render children()}
</div>
