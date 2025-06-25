import type { LayoutServerLoad } from './$types';
import { redirect, type Cookies } from '@sveltejs/kit';

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
