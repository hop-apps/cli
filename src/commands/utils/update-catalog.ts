import shell from "shelljs";

import { existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";

export function updateCatalog() {
  const catalogPath = join(homedir(), ".hop", "catalog");

  if (!existsSync(join(catalogPath, ".git"))) {
    shell.exec(`git clone https://github.com/hop-apps/catalog ${catalogPath}`, {
      silent: true,
    });
  }

  shell.cd(catalogPath);
  shell.exec(`git fetch`, { silent: true });
  shell.exec(`git pull`, { silent: true });
}
