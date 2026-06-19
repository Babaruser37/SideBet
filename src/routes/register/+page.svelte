<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-slate-900 text-white rounded-lg shadow">
	<h1 class="text-2xl font-bold mb-4">Create Account</h1>

	{#if form?.message}
		<p class="text-red-400 mb-4">{form.message}</p>
	{/if}

	<form method="POST" class="flex flex-col gap-4">
		<label class="flex flex-col gap-1">
			<span>Username (Display Name)</span>
			<input type="text" name="username" required class="p-2 rounded bg-slate-800 border border-slate-700 text-white" />
		</label>
		
		<label class="flex flex-col gap-1">
			<span>Email</span>
			<input type="email" name="email" required class="p-2 rounded bg-slate-800 border border-slate-700 text-white" />
		</label>

		<label class="flex flex-col gap-1">
			<span>Password</span>
			<input type="password" name="password" required class="p-2 rounded bg-slate-800 border border-slate-700 text-white" />
		</label>

		<button type="submit" class="bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold mt-2">
			Sign Up
		</button>
	</form>
	<p class="mt-4 text-sm text-slate-400">Already have an account? <a href="/login" class="text-blue-400 hover:underline">Log in</a></p>
</div>