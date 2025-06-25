import { CLIENT_SECRET, CLIENT_ID } from "$env/static/private";
import { json, redirect } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";

export const GET = async ({ url, cookies, fetch }: {
  url: URL,
  cookies: { get: (name: string) => string | undefined, set: (name: string, value: string, options?: { httpOnly?: boolean, secure?: boolean, path?: string, sameSite?: 'strict' | 'lax' | 'none', maxAge?: number }) => void },
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
}) => {
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response('Code not provided', { status: 400 });
  }

  const response = await fetch('https://slack.com/api/oauth.v2.access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: 'https://diddler.party/api/slack/oauth/callback'
    })
  });

  const data = await response.json();

  if (!data.ok) {
    return json({ error: data.error }, { status: 400 });
  }

  console.log('Slack OAuth response:', data);

  const sessionToken = crypto.randomUUID();

  await db.insert(user).values({
    uuid: data.authed_user.id,
    accessToken: data.authed_user.access_token,
    id: data.authed_user.id,
    subdomain: null,
  });

  cookies.set('session', sessionToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });

  throw redirect(302, '/');
}
