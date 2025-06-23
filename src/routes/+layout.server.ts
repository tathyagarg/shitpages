import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: LayoutServerLoad = async ({ cookies }: {
  cookies: {
    get: (name: string) => string | undefined;
    set: (name: string, value: string, options?: { httpOnly?: boolean; secure?: boolean; path?: string; sameSite?: 'strict' | 'lax' | 'none'; maxAge?: number }) => void;
  };
}) => {
  const sessionToken = cookies.get('session');
  if (!sessionToken) {
    return { user: null };
  }

  const userAccessToken = await db.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.uuid, sessionToken),
    columns: { accessToken: true }
  });

  if (!userAccessToken) {
    return { user: null };
  }

  console.log('User Access Token:', userAccessToken.accessToken);

  const userRes = await fetch('https://slack.com/api/openid.connect.userInfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userAccessToken.accessToken}`
    }
  })

  const userData = await userRes.json();

  console.log('User Data:', userData);

  return {
    user: {
      id: userData.sub,
      username: userData.name,
      avatar: userData.picture,
    }
  }
};
