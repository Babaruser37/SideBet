<script lang="ts">
  import type { PageData } from './$types';
  import BetSection from '$lib/components/bets/BetSection.svelte';
  import type { BetItem } from '$lib/components/bets/types';

  let { data }: { data: PageData } = $props();

  const ongoingBets: BetItem[] = [
    {
      title: 'World Cup 2026',
      imageSrc: 'https://assets.football-logos.cc/logos/tournaments/700x700/fifa-world-cup-2026--white.9ba8a004.png',
      imageAlt: '2026 world cup logo'
    },
    {
      title: 'Formula 1 2026',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/New_era_F1_logo.png',
      imageAlt: '2026 Formula 1 logo'
    }
  ];

  const pastBets: BetItem[] = [
    {
      title: 'Formula 1 2022',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/New_era_F1_logo.png',
      imageAlt: '2022 Formula 1 logo'
    }
  ];
</script>
<svelte:head>
  <title>SideBets</title>
</svelte:head>

<div class="min-h-screen bg-[radial-gradient(circle_at_top,#d9f99d,#fef3c7_45%,#fffbeb_100%)] px-6 py-10 text-slate-900">
  <div class="mx-auto max-w-7xl">
    <div class="mb-8 max-w-2xl">
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Side Bets Tracker</p>
      <h1 class="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Keep active bets bright and let finished bets fade into history.</h1>
      <p class="mt-4 text-base leading-7 text-slate-700">
        Hover any card image to zoom from 1.0 to 1.1. Past bets stay partially grayed out until hover restores the full colour.
      </p>
    </div>

    <div class="grid gap-6 xl:grid-cols-2">
      <BetSection heading="Ongoing Bets" bets={ongoingBets} />
      <BetSection heading="Past Bets" bets={pastBets} muted={true} />
    </div>
  </div>
</div>
