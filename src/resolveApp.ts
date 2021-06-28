import axios from "axios";
import yaml from "js-yaml";
import tmp from "tmp";

import { createWriteStream } from "fs";

import validateManifest from "./validateManifest";

import { App, AppManifest } from "./types";

const downloadIcon = async (
  appName: string
): Promise<{ path: string; cleanup: () => void }> => {
  const url = `https://raw.githubusercontent.com/Nickersoft/hop/master/apps/${appName}/icon.png`;

  return new Promise((resolve, reject) => {
    tmp.dir({ keep: true }, (err, path, cleanup) => {
      if (err) {
        throw err;
      } else {
        const output = `${path}/icon.png`;

        axios({
          method: "GET",
          url: url,
          responseType: "stream",
        })
          .then(({ data }) => {
            data.pipe(createWriteStream(output));

            data.on("end", () => {
              resolve({ path: output, cleanup });
            });

            data.on("error", (err) => {
              reject(err);
            });
          })
          .catch((err) => reject(err));
      }
    });
  });
};

export default async (appName: string): Promise<App> => {
  const manifestUrl = `https://raw.githubusercontent.com/Nickersoft/hop/master/apps/${appName}/manifest.yml`;

  try {
    const { data } = await axios.get(manifestUrl);

    let icon: null | string = null;
    let cleanupFunc = () => {};

    // Attempt to download the app icon if it exists
    try {
      const { path, cleanup } = await downloadIcon(appName);

      icon = path;
      cleanupFunc = cleanup;
    } catch (error) {}

    const config = yaml.load(data);

    if (!validateManifest(config as object)) {
      throw new Error(
        `Invalid manifest found for ${appName}. Skipping installation`
      );
    }

    return { manifest: config as AppManifest, icon, cleanup: cleanupFunc };
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error(`Couldn't find app: ${appName}. Skipping installation.`);
    } else {
      throw error;
    }
  }
};
