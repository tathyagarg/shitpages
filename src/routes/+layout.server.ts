import type { LayoutServerLoad } from './$types';
import { redirect, type Cookies } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { setCache, getCache } from '$lib/server/cache';

export const load: LayoutServerLoad = async ({ locals, url }: {
  url: URL,
  locals: any
}) => {
  if (locals.user) {
    return {
      user: locals.user
    };
  }
};
