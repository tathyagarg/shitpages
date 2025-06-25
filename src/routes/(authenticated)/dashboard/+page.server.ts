import { PAGES_DATA_DIR } from "$env/static/private";
import { stat, mkdir, readdir } from "fs/promises";
import { statSync } from "fs";
import { db } from "$lib/server/db";

import type { FileData } from "$lib/types";
import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }: { parent: any }) => {
  const data = await parent();

  const user_id = data?.user?.id;

  const subdomainData = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, user_id),
    columns: {
      subdomain: true
    }
  });

  const subdomain = subdomainData?.subdomain;

  if (!subdomain) {
    throw redirect(302, '/claim');
  }

  const fpath = `${PAGES_DATA_DIR}/${subdomain}`;

  try {
    await stat(fpath);
  } catch (e) {
    mkdir(fpath, { recursive: true });
  }

  const files = await readdir(fpath, { withFileTypes: true });
  const pages: FileData[] = files.map(file => {
    return {
      name: file.name,
      url: `${fpath}/${file.name}`,
      isDirectory: file.isDirectory(),
      ext: file.isDirectory() ? null : (file.name.split('.').pop() || '').toLowerCase(),
      size: file.isDirectory() ? null : statSync(`${PAGES_DATA_DIR}/${user_id}/${file.name}`).size,
    };
  });

  return { pages };
}
