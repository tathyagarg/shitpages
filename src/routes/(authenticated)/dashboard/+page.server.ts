import { PAGES_DATA_DIR } from "$env/static/private";
import { stat, mkdir, readdir } from "fs/promises";
import { statSync } from "fs";

export const load = async ({ parent }: { parent: any }) => {
  const data = await parent();

  const user_id = data?.user?.id;

  try {
    _ = await stat(`${PAGES_DATA_DIR}/${user_id}`);
  } catch (e) {
    mkdir(`${PAGES_DATA_DIR}/${user_id}`, { recursive: true });
  }

  const files = await readdir(`${PAGES_DATA_DIR}/${user_id}`, { withFileTypes: true });
  const pages = files.map(file => {
    return {
      name: file.name,
      url: `/pages/${user_id}/${file.name}`,
      isDirectory: file.isDirectory(),
      ext: file.isDirectory() ? null : file.name.split('.').pop(),
      size: file.isDirectory() ? null : statSync(`${PAGES_DATA_DIR}/${user_id}/${file.name}`).size,
    };
  });

  return { pages };
}
