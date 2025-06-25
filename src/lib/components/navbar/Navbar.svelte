<script lang="ts">
  import Navelement from "./Navelement.svelte";

  export let user: {
    id: string;
    username: string;
    avatar: string;
  } | null = null;

  console.log("User data:", user);
</script>

<div
  class="px-8 py-4 text-cat-text hover:text-cat-subtext1 flex items-center gap-4 w-full font-semibold text-lg z-10"
>
  <div class="flex items-center gap-12 flex-1">
    <Navelement href="/" label="Home" />
    <Navelement href="/dashboard" label="Dashboard" />
  </div>
  <div class="hover:underline">
    {#if user}
      <div class="flex items-center gap-4">
        {user.username}
        <img
          src={user.avatar}
          alt="User Avatar"
          class="w-12 h-12 rounded-full"
        />
      </div>
    {:else}
      <a
        href="https://slack.com/oauth/v2/authorize?scope=&amp;user_scope=openid%2Cprofile&amp;redirect_uri=https%3A%2F%2Fdiddler.party%2Fapi%2Fslack%2Foauth%2Fcallback&amp;client_id=2210535565.9071486687719"
        class="items-center text-cat-text border-2 border-cat-crust bg-cat-mantle rounded-lg flex p-2 self-end gap-2"
        aria-label="Authenticate to Slack"
      >
        <b>Authenticate with Slack</b>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="height:24px;width:24px;margin-right:0"
          viewBox="0 0 122.8 122.8"
          ><path
            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
            fill="#e01e5a"
          ></path><path
            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
            fill="#36c5f0"
          ></path><path
            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
            fill="#2eb67d"
          ></path><path
            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
            fill="#ecb22e"
          ></path></svg
        ></a
      >
    {/if}
  </div>
</div>
