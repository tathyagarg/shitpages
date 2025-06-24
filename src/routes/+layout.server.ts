import type { LayoutServerLoad } from './$types';
import type { Cookies } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { setCache, getCache } from '$lib/server/cache';

export const load: LayoutServerLoad = async ({ cookies, url }: {
  url: URL,
  cookies: Cookies
}) => {
  const searchParams = url.searchParams;
  const error = searchParams.get('error');

  const sessionToken = cookies.get('session');
  if (!sessionToken) {
    return { user: null, error };
  }

  const userAccessToken = await db.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.uuid, sessionToken),
    columns: { accessToken: true }
  });

  if (!userAccessToken) {
    return { user: null, error };
  }

  const testUserData = getCache(userAccessToken.accessToken);

  if (testUserData) {
    return { user: testUserData, error };
  }

  const userRes = await fetch('https://slack.com/api/openid.connect.userInfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userAccessToken.accessToken}`
    }
  })

  const userData = await userRes.json();

  setCache(userAccessToken.accessToken, {
    id: userData.sub,
    username: userData.name,
    avatar: userData.picture
  }, 60 * 60 * 1000);

  return {
    user: {
      id: userData.sub,
      username: userData.name,
      avatar: userData.picture,
    },
    error
  }
};
