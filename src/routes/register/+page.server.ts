import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const username = formData.get('username') as string;

		if (!email || !password || !username) {
			return fail(400, { message: 'All fields are required.' });
		}

		// Sign up via Supabase. We include the username in options.data 
		// so our database trigger can automatically extract it into the public profiles table.
		const { error } = await locals.supabase.auth.signUp({
			email,
			password,
			options: {
				data: { username }
			}
		});

		if (error) {
			return fail(400, { message: error.message });
		}

		// Registration successful; send them to the login or dashboard
		throw redirect(303, '/login?message=Check your email to confirm registration!');
	}
};