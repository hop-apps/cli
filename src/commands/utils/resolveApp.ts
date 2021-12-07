import axios from "axios";
import yaml from "js-yaml";

import { createWriteStream } from "fs";

import { validateManifest } from "./validateManifest";
import { createTempDir } from "./createTempDir";

import { App, AppManifest } from "../../types";

const downloadIcon = async (
  appName: string
): Promise<{ path: string; cleanup: () => void }> => {
  const url = `https://raw.githubusercontent.com/Nickersoft/hop/master/apps/${appName}/icon.png`;

  const { path, cleanup } = await createTempDir();

  const output = `${path}/icon.png`;

  const { data } = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  data.pipe(createWriteStream(output));

  return new Promise((resolve, reject) => {
    data.on("end", () => {
      resolve({ path: output, cleanup });
    });

    data.on("error", (err) => {
      reject(err);
    });
  });
};

export const resolveApp = async (appName: string): Promise<App> => {
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
    if ((error as any).response.status === 404) {
      throw new Error(`Couldn't find app: ${appName}. Skipping installation.`);
    } else {
      throw error;
    }
  }
};
