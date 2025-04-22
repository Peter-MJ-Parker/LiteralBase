import { REST, Routes } from "discord.js";
import { env, logs } from "#utilities";
import ReadFolder from "./ReadFolder.js"; // Adjust path if necessary
import { CommandFile } from "../types.js";

export default async function () {
  const commands: CommandFile[] = [];
  const devCommands: CommandFile[] = [];
  const commandFiles = ReadFolder(`Commands`);

  for (const file of commandFiles) {
    const cmd = await import(file);
    const command: CommandFile = cmd.default;
    if (!command) {
      logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if ("name" in command && "description" in command && "execute" in command) {
      if (!command["dev"]) {
        commands.push(command);
      } else {
        devCommands.push(command);
      }

      if (command["aliases"] && Array.isArray(command["aliases"])) {
        for (const alias of command["aliases"]) {
          const aliasCommand = {
            ...command,
            data: { ...command, name: alias },
          };

          if (!command["dev"]) {
            commands.push(aliasCommand);
          } else {
            devCommands.push(aliasCommand);
          }
        }
      }
    } else {
      logs.warn(
        `The command at ${file} is missing a required "data" or "execute" property.`
      );
    }
  }

  const rest = new REST().setToken(env.DISCORD_TOKEN);

  if (!commands.length && !devCommands.length) {
    logs.warn("No commands found to register.");
    return;
  }

  try {
    logs.debug(
      `Started refreshing ${
        commands.length + devCommands.length
      } application (/) commands.`
    );

    const data: any = await rest.put(Routes.applicationCommands(env.clientId), {
      body: commands,
    });

    const devData: any = await rest.put(
      Routes.applicationGuildCommands(env.clientId, env.devGuild),
      { body: devCommands }
    );

    logs.debug(
      `Successfully reloaded ${
        data.length + devData.length
      } application (/) commands.`
    );
  } catch (error) {
    logs.error(`Failed to register commands: ${error}`);
  }
}
