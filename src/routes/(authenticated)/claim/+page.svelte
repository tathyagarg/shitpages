<script lang="ts">
</script>

<section class="w-full h-full">
  <form
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cat-mantle border-2 border-cat-surface1 rounded-lg p-8 box-border"
    method="POST"
  >
    <h1 class="text-3xl font-bold">Claim your Subdomain</h1>
    <input
      name="subdomain"
      type="text"
      placeholder="Enter your desired subdomain"
      class="w-full mt-4 p-2 bg-cat-surface0 border-2 border-cat-surface1 rounded-md text-cat-text"
      required
      pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
    />
    <button
      class="w-full mt-4 bg-cat-green text-cat-base p-2 rounded-md cursor-pointer"
      >Claim!</button
    >
  </form>
</section>
