<script lang="ts">
  import BetCard from './BetCard.svelte';
  import type { BetItem } from './types';

  let {
    heading,
    bets,
    listClass = '',
    muted = false
  }: {
    heading: string;
    bets: BetItem[];
    listClass?: string;
    muted?: boolean;
  } = $props();
</script>

<section class="flex-1 rounded-4xl border border-white/50 bg-white/35 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur-sm">
  <div class="mb-5 flex items-center justify-between gap-4">
    <h1 class="text-2xl font-bold tracking-tight text-slate-900">{heading}</h1>
    <span class="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-slate-600">{bets.length} bets</span>
  </div>
  <div class={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 ${listClass}`.trim()}>
    {#each bets as bet}
      <BetCard {bet} {muted} />
    {/each}
  </div>
</section>