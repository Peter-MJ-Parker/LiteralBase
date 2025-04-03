import { token, clientId, devGuild } from '../../config.json';
import { REST, Routes } from 'discord.js';
import ReadFolder from './ReadFolder';
import logs from './Logs';

const commands: any = [];
const devCommands: any = [];
const commandFiles = ReadFolder(`${__dirname}/../Commands`);

for (const file of commandFiles) {
  const command = require(file).default;
  if (!command) {
    logs.warn(`The file at ${file} does not export a valid command.`);
    continue;
  }

  if (command['data'] && command['execute']) {
    commands.push(command.data.toJSON());
  } else if (command['data'] && command['execute'] && command['dev']) {
    devCommands.push(command.data.toJSON());
  } else {
    logs.warn(
      `The command at ${file} is missing a required "data" or "execute" property.`
    );
  }
}

const rest = new REST().setToken(token);

export default async function () {
  if (!commands.length && !devCommands.length) {
    logs.warn('No commands found to register.');
    return;
  }

  try {
    logs.debug(
      `Started refreshing ${
        commands.length + devCommands.length
      } application (/) commands.`
    );

    const data: any = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    const devData: any = await rest.put(
      Routes.applicationGuildCommands(clientId, devGuild),
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
