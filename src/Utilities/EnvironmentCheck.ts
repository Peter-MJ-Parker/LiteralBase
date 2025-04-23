import fs from "fs";
import { logs } from "#utilities";

export default function (errors: string[] = []) {
  const requiredFolders = {
    Buttons: "./build/Buttons",
    Commands: "./build/Commands",
    Events: "./build/Events",
    Menus: "./build/Menus",
    Messages: "./build/Messages",
    Modals: "./build/Modals",
    Contexts: "./build/Contexts"
  };

  for (const folder of Object.values(requiredFolders)) {
    if (!fs.existsSync(folder)) {
      logs.error(`Missing ${folder} folder - creating...`);
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  if (errors.length > 0) {
    logs.error("Environment check failed with the following errors:");
    errors.forEach((error) => logs.error(error));
    process.exit(1);
  }
}
