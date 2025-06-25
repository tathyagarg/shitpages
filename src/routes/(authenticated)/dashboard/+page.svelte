<script lang="ts">
  import Directory from "$lib/components/tree/Directory.svelte";
  import File from "$lib/components/tree/File.svelte";

  import type { FileData } from "$lib/types";

  const { data } = $props();
  const { pages }: { pages: FileData[] } = data;
</script>

<section class="w-screen h-screen p-24">
  <h1 class="text-2xl font-black my-2">Your Files</h1>
  <table
    class="w-full bg-cat-base [&_td,&_th]:px-2 [&_td,&_th]:py-3 border-2 border-cat-surface1 overflow-hidden"
  >
    <thead>
      <tr>
        <th class="w-8"></th>
        <th class="text-left">Name</th>
        <th class="text-right">Size</th>
      </tr>
    </thead>
    <tbody>
      {#each pages as page}
        <tr
          class="box-border [&_td:nth-child(1)]:pl-4 [&_td]:border-t-2 [&_td]:border-cat-surface1 bg-cat-surface0 hover:bg-cat-surface2 cursor-pointer"
        >
          {#if page.isDirectory}
            <Directory {page} />
          {:else}
            <File {page} />
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</section>
