import { db } from '$lib/server/db';
import { setCache, getCache } from '$lib/server/cache';

export const handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session');

  if (!token) {
    return await resolve(event);
  }

  const userAccessToken = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.uuid, token),
    columns: { accessToken: true }
  });

  if (!userAccessToken) {
    return await resolve(event);
  }

  const cachedUserData = getCache(userAccessToken.accessToken);
  if (cachedUserData) {
    event.locals.user = cachedUserData;
    return await resolve(event);
  }

  const userRes = await fetch('https://slack.com/api/openid.connect.userInfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userAccessToken.accessToken}`
    }
  });
  const userData = await userRes.json();

  const user_id = userData.sub;

  const subdomain = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, user_id),
    columns: {
      subdomain: true
    }
  });

  const user = {
    id: userData.sub,
    username: userData.name,
    avatar: userData.picture,
    subdomain: subdomain?.subdomain || null
  };

  setCache(userAccessToken.accessToken, user, 60 * 60 * 1000);

  event.locals.user = user;

  return await resolve(event);
}
