import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	// Capture any confirmation messages sent from registration
	return { message: url.searchParams.get('message') };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { message: 'Email and password are required.' });
		}

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return fail(400, { message: error.message });
		}

		// Auth cookies are handled automatically by our server hook. 
		// Redirect directly to the pool lobby.
		throw redirect(303, '/dashboard');
	}
};