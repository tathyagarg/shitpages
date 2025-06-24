import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }: { parent: any }) => {
  const data = await parent();

  if (!data) {
    throw redirect(302, '/?reason=not-auth')
  }
}
