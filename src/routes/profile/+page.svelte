<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="mx-auto mt-10 max-w-4xl px-4">
	<h1 class="mb-6 text-3xl font-bold text-slate-100">Profile</h1>

	{#if !data.profile}
		<div class="rounded-lg border border-red-500/40 bg-red-950/60 p-4 text-red-100">
			Unable to load profile. Please log in again.
		</div>
	{:else}
		<div class="grid gap-6 md:grid-cols-[280px_1fr]">
			<section class="rounded-xl border border-slate-800 bg-slate-900 p-5 text-slate-100 shadow">
				<h2 class="mb-4 text-lg font-semibold">Account Info</h2>

				<div class="mb-4 flex items-center gap-4">
					{#if form?.avatarUrl || data.profile.avatarUrl}
						<img
							src={form?.avatarUrl ?? data.profile.avatarUrl}
							alt="Profile"
							class="h-20 w-20 rounded-full border border-slate-700 object-cover"
						/>
					{:else}
						<div
							class="flex h-20 w-20 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-2xl font-bold"
						>
							{data.profile.username.slice(0, 1).toUpperCase()}
						</div>
					{/if}
					<div>
						<p class="text-sm text-slate-400">Username</p>
						<p class="font-medium">{data.profile.username}</p>
					</div>
				</div>

				<div class="space-y-3 text-sm">
					<p><span class="text-slate-400">Email:</span> {data.profile.email}</p>
					<p><span class="text-slate-400">User ID:</span> {data.profile.id}</p>
					<p>
						<span class="text-slate-400">Joined:</span>
						{data.profile.createdAt
							? new Date(data.profile.createdAt).toLocaleDateString()
							: 'Unknown'}
					</p>
				</div>

				<form method="POST" action="?/avatar" enctype="multipart/form-data" class="mt-5 space-y-3">
					<label class="block text-sm font-medium text-slate-300" for="avatar">Change profile picture</label>
					<input
						id="avatar"
						type="file"
						name="avatar"
						accept="image/*"
						class="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-500"
					/>
					<button
						type="submit"
						class="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
					>
						Update Picture
					</button>
				</form>

				{#if form?.avatarMessage}
					<p class="mt-3 text-sm {form.avatarMessage.includes('successfully') ? 'text-emerald-400' : 'text-red-400'}">
						{form.avatarMessage}
					</p>
				{/if}
			</section>

			<section class="rounded-xl border border-slate-800 bg-slate-900 p-5 text-slate-100 shadow">
				<h2 class="mb-4 text-lg font-semibold">Past Bet Placements</h2>

				{#if data.placements.length === 0}
					<div class="rounded-lg border border-slate-700 bg-slate-800/70 p-4 text-slate-300">
						{data.placementNotice ?? 'No past bets found yet.'}
					</div>
				{:else}
					<div class="overflow-hidden rounded-lg border border-slate-700">
						<table class="min-w-full divide-y divide-slate-700 text-left text-sm">
							<thead class="bg-slate-800 text-slate-300">
								<tr>
									<th class="px-4 py-3 font-semibold">Bet</th>
									<th class="px-4 py-3 font-semibold">Placement</th>
									<th class="px-4 py-3 font-semibold">Date</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-800 bg-slate-900">
								{#each data.placements as placement}
									<tr>
										<td class="px-4 py-3">{placement.title}</td>
										<td class="px-4 py-3">{placement.placement}</td>
										<td class="px-4 py-3 text-slate-300">
											{placement.createdAt
												? new Date(placement.createdAt).toLocaleDateString()
												: 'Unknown'}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</section>
		</div>
	{/if}
</div>
