import { homedir } from "os";
import { join } from "path";

export function getCatalogPath() {
  return join(homedir(), ".hop", "catalog", "apps");
}
