import { readdirSync, moveSync } from "fs-extra";
import { join } from "path";

export const installApp = (appPath: string, overwrite: boolean = false) => {
  const files = readdirSync(appPath);
  const file = files.filter((filter) => filter.endsWith(".app"))?.[0];

  if (!file) {
    throw new Error("Could not find app in build directory!");
  }

  moveSync(join(appPath, file), `/Applications/${file}`, { overwrite });
};
