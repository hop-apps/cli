import config from "../../config";

import { buildNativefierApp } from "nativefier";
import { App } from "../../types";
import { createTempDir } from "./create-temp-dir";

type BuildOutput = {
  path: string;
  cleanup: () => void;
};

export async function buildApp(app: App): Promise<BuildOutput> {
  process.env["ELECTRON_ENABLE_LOGGING"] = "false";

  const { manifest, cleanup: appCleanup, icon } = app;
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
        appCleanup?.();
      },
    };
  } else {
    throw new Error("App path is undefined! Not sure what happened :/");
  }
}
