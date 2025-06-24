<script lang="ts">
  import "../app.css";

  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
  let { user } = data;
</script>

<div
  class="min-h-screen min-w-screen overflow-x-hidden bg-cat-base font-default text-cat-text"
>
  <Navbar {user} />
  {@render children()}
</div>
