import { Command } from "commander";

import { updateCatalog } from "./utils/update-catalog";

export const update = new Command("update").action(updateCatalog);
