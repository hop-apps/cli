import tmp from "tmp";

import { buildNativefierApp } from "nativefier";
import { App } from "./types";

export default ({
  manifest,
  cleanup: appCleanup,
  icon,
}: App): Promise<{ path: string; cleanup: () => void }> => {
  process.env["ELECTRON_ENABLE_LOGGING"] = "false";

  return new Promise((resolve, reject) => {
    tmp.dir({ keep: true }, (err, path, cleanup) => {
      if (err) {
        reject(err);
      } else {
        buildNativefierApp({
          name: manifest.name,
          targetUrl: manifest.url,
          platform: "darwin",
          out: path,
          ...(icon && { icon }),
        })
          .then((appPath) => {
            if (appPath) {
              resolve({
                path: appPath,
                cleanup: () => {
                  cleanup();
                  appCleanup();
                },
              });
            } else {
              reject(
                new Error("App path is undefined! Not sure what happened :/")
              );
            }
          })
          .catch((err) => reject(err));
      }
    });
  });
};
