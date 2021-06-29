import { Command } from "commander";

import * as commands from "./commands";

const program = new Command();

Object.values(commands).forEach((command) => program.addCommand(command));

program.parse(process.argv);
