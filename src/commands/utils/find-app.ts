import { existsSync } from "fs";

import { updateCatalog } from "./update-catalog";
import { dirname, join } from "path";
import { getCatalogPath } from "./get-catalog-path";

export function findApp(appName: string): string {
  const intendedPath = join(getCatalogPath(), appName, "manifest.yml");

  if (existsSync(intendedPath)) {
    return dirname(intendedPath);
  }

  updateCatalog();
  console.log(intendedPath);
  if (!existsSync(intendedPath)) {
    throw new Error(`App does not exist`);
  }

  return dirname(intendedPath);
}
