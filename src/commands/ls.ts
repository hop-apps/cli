import { Command } from "commander";

import octokit from "../octokit";
import config from "../config";

/**
 * Lists all web apps available for download via Octokit.
 */
export const ls = new Command("ls").action(async () => {
  const { default: ora } = await import("ora");

  const spinner = ora({ hideCursor: true }).start();

  const { data } = await octokit.rest.repos.getContent({
    owner: config.repo.owner,
    repo: config.repo.name,
    path: "apps",
  });

  spinner.stop();

  console.log("\nAvailable Apps:\n===============\n");

  // @ts-expect-error
  const names = data.map(({ name }) => `- ${name}`).sort();

  console.log(names.join("\n"));
  console.log("\n");
});
