import yaml from "js-yaml";

import { join } from "path";

import { validateManifest } from "./validate-manifest";
import { findApp } from "./find-app";

import type { App, AppManifest } from "../../types";
import { readFileSync } from "fs";

export const resolveApp = async (appName: string): Promise<App> => {
  const appDirectory = findApp(appName);
  const manifest = readFileSync(join(appDirectory, "manifest.yml"), "utf-8");
  const icon = join(appDirectory, "icon.png");
  const config = yaml.load(manifest);

  if (!validateManifest(config as object)) {
    throw new Error(
      `Invalid manifest found for ${appName}. Skipping installation.`
    );
  }

  return { manifest: config as AppManifest, icon };
};
