import { LiteralClient, CommandFile } from "../types.js";
import { logs, ReadFolder } from "#utilities";

export default async function (client: LiteralClient) {
  let commandCount = 0;
  const commandFiles = ReadFolder(`Commands`);

  for (const file of commandFiles) {
    const cmd = await import(file);
    const command: CommandFile = cmd.default;
    if (!command) {
      logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if (!command.execute || typeof command.execute !== "function") {
      logs.warn(`Command ${file} has an invalid execute function`);
      continue;
    }

    if (command.cooldown && typeof command.cooldown !== "number") {
      logs.warn(`Command ${file} has an invalid cooldown property`);
      continue;
    }

    if (command.aliases && !Array.isArray(command.aliases)) {
      logs.warn(`Command ${file} has an invalid cooldown property`);
      continue;
    }

    client.commands.set(command.name, command);
    commandCount++;

    for (const alias of command.aliases || []) {
      if (typeof alias !== 'string') {
        logs.warn(`Command ${file} has an invalid alias`);
        continue;
      }

      if (client.commands.has(alias)) {
        logs.warn(`Command ${file} has an alias that is already in use`);
        continue;
      }

      client.commands.set(alias, command);
      commandCount++;
    }
  }

  logs.info(`Loaded ${commandCount} commands`);
}
