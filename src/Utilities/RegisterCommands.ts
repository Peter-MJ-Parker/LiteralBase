import { env, LiteralClient, logs, ReadFolder } from '#utilities';
import { REST, Routes } from 'discord.js';
import { CommandFile, ContextMessageFile, ContextUserFile } from '../types.js';

export default async function (client: LiteralClient) {
  const commands: CommandFile[] = [];
  const contexts: (ContextMessageFile | ContextUserFile)[] = [];
  const commandFiles = ReadFolder('Commands');
  const contextFiles = ReadFolder('Contexts');

  for (const file of commandFiles) {
    const cmd = await import(file);
    const command: CommandFile = cmd.default;
    if (!command) {
      logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if ('name' in command && 'description' in command && 'execute' in command) {
      commands.push(command);
    } else {
      logs.warn(`The command at ${file} is missing a required "name", "description", or "execute" property.`);
    }
  }

  for (const file of contextFiles) {
    const cmd = await import(file);
    const command: ContextMessageFile | ContextUserFile = cmd.default;
    if (!command) {
      logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if ('name' in command && 'execute' in command) {
      contexts.push(command);
    } else {
      logs.warn(`The command at ${file} is missing a required "name" or "execute" property.`);
    }
  }

  const allComands = [...commands, ...contexts];
  if (!allComands.length) {
    logs.warn('No commands found to register.');
    return;
  }

  const globalCommands = allComands.filter(command => !command.guild_ids || !Array.isArray(command.guild_ids));
  const guildSpecificCommands = allComands.filter(command => command.guild_ids && Array.isArray(command.guild_ids));

  try {
    logs.debug(`Started refreshing ${allComands.length} application (/) commands.`);
    const rest = new REST().setToken(env.DISCORD_TOKEN);

    // Register global commands
    const globalData: any = await rest.put(Routes.applicationCommands(env.clientId), {
      body: globalCommands
    });
    logs.debug(`Successfully registered ${globalData.length} global commands.`);

    // Fetch all guilds and ensure they are cached
    const guilds = await client.guilds.fetch();
    const guildCommandsMap: { [key: string]: Array<{}> } = {};

    // Map commands to their respective guilds
    for (const command of guildSpecificCommands) {
      if (command.guild_ids && Array.isArray(command.guild_ids)) {
        for (const guildId of command.guild_ids) {
          if (!guildCommandsMap[guildId]) {
            guildCommandsMap[guildId] = [];
          }
          guildCommandsMap[guildId].push(command);
        }
      }
    }

    // Determine which guilds need to have their commands cleared
    const guildIdsToClear = new Set<string>();
    for (const guild of guilds.values()) {
      if (!guildCommandsMap[guild.id]) {
        guildIdsToClear.add(guild.id); // Guild is not in the commands map, so it needs to be cleared
      }
    }

    // Clear commands only for guilds that are no longer targeted
    const clearPromises = Array.from(guildIdsToClear).map(async guildId => {
      try {
        await rest.put(Routes.applicationGuildCommands(env.clientId, guildId), { body: [] });
        logs.debug(`Cleared all commands for guild ID ${guildId}.`);
      } catch (error) {
        logs.error(`Failed to clear commands for guild ID ${guildId}: ${error}`);
      }
    });

    await Promise.all(clearPromises);

    // Register commands for guilds in the guildCommandsMap
    const registerPromises = Object.entries(guildCommandsMap).map(async ([guildId, commands]) => {
      const guild = guilds.get(guildId); // Use the fetched guilds
      if (!guild) {
        logs.warn(`The bot is not in the guild with ID ${guildId}, skipping command registration for this guild.`);
        return;
      }

      try {
        const guildData: any = await rest.put(Routes.applicationGuildCommands(env.clientId, guild.id), {
          body: commands
        });

        if (guildData.length > 0) {
          logs.debug(
            `Successfully registered ${guildData.length} ${guildData.length === 1 ? `command` : 'commands'} in guild ${
              guild.name
            } (${guildId}).`
          );
        } else {
          logs.debug(`No commands were registered in guild ${guild.name} (${guildId}).`);
        }
      } catch (error) {
        logs.error(`Failed to register commands for guild ${guildId}: ${error}`);
      }
    });

    await Promise.all(registerPromises);

    logs.debug(`Successfully reloaded ${globalData.length} global commands and guild-specific commands.`);
  } catch (error) {
    logs.error(`Failed to register commands: ${error}`);
    console.error(error);
  }
}
