<script lang="ts">
  import DirectoryIcon from "~icons/mdi/folder";

  export let page: {
    name: string;
    url: string;
  };
</script>

<td>
  <DirectoryIcon class="inline-block" />
</td>
<td>
  <h2 class="">{page.name}</h2>
</td>
<td></td>
