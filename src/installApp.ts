import tmp from 'tmp';

import { buildNativefierApp  } from "nativefier";

export default async () => {
  const appPath = await buildNativefierApp({
    // name: manifest.name,
    // targetUrl: manifest.url,
    platform: "darwin",
    out: "./dist"
  });

}