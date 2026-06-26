import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type PlacementRow = {
	id: string;
	title: string;
	placement: string;
	createdAt: string | null;
};

const AVATAR_BUCKET = 'avatars';

type PlacementCandidate = {
	table: string;
	title: string[];
	placement: string[];
	date: string[];
};

const PLACEMENT_CANDIDATES: PlacementCandidate[] = [
	{
		table: 'bets',
		title: ['title', 'bet_name', 'name'],
		placement: ['placement', 'position', 'result_place'],
		date: ['created_at', 'placed_at', 'updated_at']
	},
	{
		table: 'bet_placements',
		title: ['title', 'bet_name', 'name'],
		placement: ['placement', 'position', 'result_place'],
		date: ['created_at', 'placed_at', 'updated_at']
	},
	{
		table: 'placements',
		title: ['title', 'bet_name', 'name'],
		placement: ['placement', 'position', 'result_place'],
		date: ['created_at', 'placed_at', 'updated_at']
	}
];

function pickFirstValue(record: Record<string, unknown>, keys: string[]): unknown {
	for (const key of keys) {
		if (record[key] !== undefined && record[key] !== null) {
			return record[key];
		}
	}
	return null;
}

async function fetchPlacementRows(locals: App.Locals, userId: string): Promise<PlacementRow[]> {
	for (const candidate of PLACEMENT_CANDIDATES) {
		const { data, error } = await locals.supabase
			.from(candidate.table)
			.select('*')
			.eq('user_id', userId)
			.order('created_at', { ascending: false })
			.limit(20);

		if (error || !data) {
			continue;
		}

		const rows = data.map((row: Record<string, unknown>) => {
			const record = row;
			const title = pickFirstValue(record, candidate.title);
			const placement = pickFirstValue(record, candidate.placement);
			const createdAt = pickFirstValue(record, candidate.date);

			return {
				id: String(record.id ?? crypto.randomUUID()),
				title: title ? String(title) : 'Untitled bet',
				placement: placement ? String(placement) : 'Pending',
				createdAt: createdAt ? String(createdAt) : null
			};
		});

		return rows;
	}

	return [];
}

async function uploadAvatar(locals: App.Locals, userId: string, file: File) {
	const extension = file.name.includes('.') ? file.name.split('.').pop() : 'png';
	const filePath = `${userId}/${Date.now()}.${extension}`;

	const { error: uploadError } = await locals.supabase.storage
		.from(AVATAR_BUCKET)
		.upload(filePath, file, { contentType: file.type, upsert: true });

	if (uploadError) {
		throw new Error(uploadError.message);
	}

	const { data } = locals.supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);
	return { publicUrl: data.publicUrl, bucket: AVATAR_BUCKET };
}

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession();

	if (!user) {
		return {
			profile: null,
			placements: [] as PlacementRow[],
			placementNotice: 'You need to be logged in to view this page.'
		};
	}

	const placements = await fetchPlacementRows(locals, user.id);
	const metadata = user.user_metadata ?? {};

	return {
		profile: {
			id: user.id,
			email: user.email ?? 'No email on file',
			username: (metadata.username as string | undefined) ?? 'No username set',
			avatarUrl: (metadata.avatar_url as string | undefined) ?? null,
			createdAt: user.created_at
		},
		placements,
		placementNotice:
			placements.length === 0
				? 'No past bets yet. Place your first bet to start tracking placements.'
				: null
	};
};

export const actions: Actions = {
	avatar: async ({ request, locals }) => {
		const { user } = await locals.safeGetSession();

		if (!user) {
			return fail(401, { avatarMessage: 'You must be logged in to update your profile picture.' });
		}

		const formData = await request.formData();
		const avatarFile = formData.get('avatar');

		if (!(avatarFile instanceof File) || avatarFile.size === 0) {
			return fail(400, { avatarMessage: 'Please choose an image file before saving.' });
		}

		if (!avatarFile.type.startsWith('image/')) {
			return fail(400, { avatarMessage: 'Only image uploads are supported.' });
		}

		try {
			const { publicUrl } = await uploadAvatar(locals, user.id, avatarFile);
			const { error: updateError } = await locals.supabase.auth.updateUser({
				data: {
					avatar_url: publicUrl
				}
			});

			if (updateError) {
				return fail(500, { avatarMessage: updateError.message });
			}

			return {
				avatarMessage: 'Profile picture updated successfully.',
				avatarUrl: publicUrl
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unable to upload profile picture.';
			return fail(500, { avatarMessage: message });
		}
	}
};
