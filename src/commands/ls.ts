import ora from "ora";

import { Command } from "commander";

import octokit from "../octokit";
import config from "../config";

export const ls = new Command("ls").action(async () => {
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
