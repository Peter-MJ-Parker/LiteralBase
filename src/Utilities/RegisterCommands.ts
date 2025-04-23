import { env, LiteralClient, logs, ReadFolder } from "#utilities";
import { REST, Routes } from "discord.js";
import { CommandFile,ContextMessageFile, ContextUserFile } from "../types.js";

export default async function (client: LiteralClient) {
  const commands: CommandFile[] = [];
  const contexts: (ContextMessageFile | ContextUserFile)[] = [];
  const commandFiles = ReadFolder("Commands");
  const contextFiles = ReadFolder("Contexts");

  for (const file of commandFiles) {
    const cmd = await import(file);
    const command: CommandFile = cmd.default;
    if (!command) {
      logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if ("name" in command && "description" in command && "execute" in command) {
      commands.push(command);
    } else {
      logs.warn(
        `The command at ${file} is missing a required "name", "description", or "execute" property.`
      );
    }
  }

  for (const file of contextFiles) {
    const cmd = await import(file);
    const command: ContextMessageFile | ContextUserFile = cmd.default;
    if (!command) {
      logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if ("name" in command && "execute" in command) {
      contexts.push(command);
    } else {
      logs.warn(
        `The command at ${file} is missing a required "name" or "execute" property.`
      );
    }
  }

  const allComands = [...commands, ...contexts];
  if (!allComands.length) {
    logs.warn("No commands found to register.");
    return;
  }

  try {
    logs.debug(
      `Started refreshing ${allComands.length} application (/) commands.`
    );

    const rest = new REST().setToken(env.DISCORD_TOKEN);
    const data: any = await rest.put(Routes.applicationCommands(env.clientId), {
      body: allComands,
    });

    let guildCommandCount = 0;
    for (const command of allComands) {
      if (command.guild_ids && Array.isArray(command.guild_ids)) {
        for (const guildId of command.guild_ids) {
          if (!client.guilds.cache.has(guildId)) {
            logs.warn(
              `The bot is not in the guild with ID ${guildId}, skipping command registration for this guild.`
            );
            continue;
          }

          try {
            const guildData: any = await rest.put(
              Routes.applicationGuildCommands(env.clientId, guildId),
              { body: [command] }
            );
            logs.debug(
              `Successfully registered command "${command.name}" in guild ${guildId}.`
            );
            guildCommandCount = guildData.length;
          } catch (error) {
            logs.error(
              `Failed to register command "${command.name}" in guild ${guildId}: ${error}`
            );
            guildCommandCount = 0;
          }
        }
      }
    }

    logs.debug(
      `Successfully reloaded ${
        data.length || 0 + guildCommandCount
      } application (/) commands.`
    );
  } catch (error) {
    logs.error(`Failed to register commands: ${error}`);
    console.error(error);
  }
}
