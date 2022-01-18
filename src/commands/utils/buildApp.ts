import config from "../../config";

import { buildNativefierApp } from "nativefier";
import { App } from "../../types";
import { createTempDir } from "./createTempDir";

export const buildApp = async ({
  manifest,
  cleanup: appCleanup,
  icon,
}: App): Promise<{ path: string; cleanup: () => void }> => {
  process.env["ELECTRON_ENABLE_LOGGING"] = "false";

  const { path, cleanup } = await createTempDir();

  const appPath = await buildNativefierApp({
    name: manifest.name,
    targetUrl: manifest.url,
    platform: "darwin",
    quiet: true,
    internalUrls: ".*?",
    disableOldBuildWarning: true,
    userAgent: config.defaultUserAgent,
    out: path,
    ...(icon && { icon }),
    ...(manifest.titleBar === false && { titleBarStyle: "hidden" }),
  });

  if (appPath) {
    return {
      path: appPath,
      cleanup: () => {
        cleanup();
        appCleanup();
      },
    };
  } else {
    throw new Error("App path is undefined! Not sure what happened :/");
  }
};
