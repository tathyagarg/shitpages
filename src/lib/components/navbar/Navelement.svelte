<script lang="ts">
  export let href: string;
  export let label: string;
</script>

<div>
  <a {href} class="hover:underline"> {label} </a>
</div>
