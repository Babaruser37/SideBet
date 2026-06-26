<script lang="ts">
  import type { PageData } from '../../routes/$types';

  let { data }: { data: PageData } = $props();

  function getAvatarUrl() {
    return data.session?.user?.user_metadata?.avatar_url ?? null;
  }

  function getUsername() {
    return data.session?.user?.user_metadata?.username ?? data.session?.user?.email ?? 'Profile';
  }
</script>

<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex items-center justify-between">
    <div class="text-xl font-bold text-white">SideBets</div>
    <div class="flex items-center gap-4">
      <a href="/" class="text-gray-300 hover:text-white">Home</a>
      <a href="/stats" class="text-gray-300 hover:text-white">Stats</a>
      <a
        href="/profile"
        class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-slate-700 text-sm font-semibold text-white hover:border-slate-400"
        aria-label={`Open ${getUsername()} profile`}
        title={getUsername()}
      >
        {#if getAvatarUrl()}
          <img src={getAvatarUrl() ?? undefined} alt={getUsername()} class="h-full w-full object-cover" />
        {:else}
          <span>{getUsername().slice(0, 1).toUpperCase()}</span>
        {/if}
      </a>
    </div>
  </div>
</nav>