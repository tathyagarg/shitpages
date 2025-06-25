import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types";

import { db } from '$lib/server/db';
import { user } from "$lib/server/db/schema";

import { eq } from "drizzle-orm";

export const load = async ({ locals }: { locals: any }) => {
  if (locals.user.subdomain) {
    throw redirect(302, '/?reason=already-claimed');
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    console.log('Claiming subdomain...', locals.user.id);
    const formData = await request.formData();
    const subdomain = formData.get('subdomain')?.toString().trim();

    if (!subdomain) {
      return { error: 'Subdomain is required' };
    }

    if (!/^[a-z0-9]+$/.test(subdomain)) {
      return { error: 'Subdomain can only contain lowercase letters and numbers' };
    }

    const existingUser = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.subdomain, subdomain),
    });

    if (existingUser) {
      return { error: 'Subdomain already exists' };
    }

    await db.update(user)
      .set({ subdomain })
      .where(eq(user.id, locals.user.id));

    locals.user.subdomain = subdomain;

    console.log('Subdomain claimed:', subdomain);

    throw redirect(302, `/?success=subdomain-claimed`);
  }
} satisfies Actions;
