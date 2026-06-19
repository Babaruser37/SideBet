<script lang="ts">
	import type { ActionData, PageData } from './$types';

	// Pull both data and form natively from the reactive $props() system
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-slate-900 text-white rounded-lg shadow">
	<h1 class="text-2xl font-bold mb-4">Log In</h1>

	{#if data.message}  
		<p class="text-green-400 mb-4">{data.message}</p>
	{/if}
	{#if form?.message}
		<p class="text-red-400 mb-4">{form.message}</p>
	{/if}

	<form method="POST" class="flex flex-col gap-4">
		<label class="flex flex-col gap-1">
			<span>Email</span>
			<input type="email" name="email" required class="p-2 rounded bg-slate-800 border border-slate-700 text-white" />
		</label>

		<label class="flex flex-col gap-1">
			<span>Password</span>
			<input type="password" name="password" required class="p-2 rounded bg-slate-800 border border-slate-700 text-white" />
		</label>

		<button type="submit" class="bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold mt-2">
			Sign In
		</button>
	</form>
	<p class="mt-4 text-sm text-slate-400">Need an account? <a href="/register" class="text-blue-400 hover:underline">Register</a></p>
</div>