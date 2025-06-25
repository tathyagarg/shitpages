import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }: { locals: any }) => {
  if (!locals.user) throw redirect(302, '/?reason=not-auth');

  return {
    user: locals.user
  }
}
