<script lang="ts">
  import type { BetItem } from './types';

  let {
    bet,
    muted = false
  }: {
    bet: BetItem;
    muted?: boolean;
  } = $props();
</script>

<article
  class={`group overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-3 shadow-md shadow-emerald-950/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/15 ${muted ? 'border-slate-300/70 bg-slate-100/80' : ''}`.trim()}
>
  <div class="overflow-hidden rounded-xl">
    <img
      src={bet.imageSrc}
      alt={bet.imageAlt}
      class={`mb-2 aspect-square w-full object-contain transition duration-300 ease-out group-hover:scale-110 ${muted ? 'grayscale-[0.8] group-hover:grayscale-0' : ''}`.trim()}
    />
  </div>
  <p class={`text-base font-semibold tracking-tight text-center ${muted ? 'text-slate-600 group-hover:text-slate-800' : 'text-slate-800'}`.trim()}>
    {bet.title}
  </p>
</article>