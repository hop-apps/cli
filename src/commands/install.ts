import { Command } from "commander";

import { resolveApp, buildApp, installApp } from "./utils";

export const install = new Command("install")
  .argument("<apps...>")
  .option("-f, --overwrite", "overwrites the app if it already exists")
  .action((apps, { overwrite }) => {
    Promise.all(
      apps.map(async (appName) => {
        const { default: ora } = await import("ora");

        const spinner = ora(`Resolving app '${appName}'...`).start();

        let cleanup = () => {};

        try {
          const app = await resolveApp(appName);
          const name = app.manifest.name;

          spinner.text = `Building ${name}...`;

          const { path: appPath, cleanup: appCleanup } = await buildApp(app);

          cleanup = appCleanup;

          spinner.text = `Installing ${name}...`;

          const force = overwrite ?? false;

          installApp(appPath, force);

          spinner.text = `Cleaning up...`;

          cleanup();

          spinner.succeed(`Successfully installed ${name}!`);
        } catch (error) {
          spinner.fail(
            `Failed to install ${appName} with error: "${error.toString()}"`
          );
          cleanup();
        }
      })
    );
  });
