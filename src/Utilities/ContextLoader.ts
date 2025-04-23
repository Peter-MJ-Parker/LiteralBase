import { LiteralClient, ContextMessageFile, ContextUserFile } from "../types.js";
import { logs, ReadFolder } from "#utilities";

export default async function (client: LiteralClient) {
  let contextCount = 0;
  const commandFiles = ReadFolder(`Contexts`);

  for (const file of commandFiles) {
    const cmd = await import(file);
    const command: ContextMessageFile | ContextUserFile = cmd.default;
    if (!command) {
      logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if (!command.execute || typeof command.execute !== "function") {
      logs.warn(`Command ${file} has an invalid execute function`);
      continue;
    }

    client.contexts.set(command.name, command)
    contextCount++;
  }

  logs.info(`Loaded ${contextCount} context commands`);
}
