import { LiteralClient } from '../types';
import ReadFolder from './ReadFolder';

export default function (client: LiteralClient) {
  let commandCount = 0;
  const commandFiles = ReadFolder(`${__dirname}/../Commands`);

  for (const file of commandFiles) {
    const command = require(file).default;
    if (!command) {
      client.logs.warn(`The file at ${file} does not export a valid command.`);
      continue;
    }

    if (!command.data || typeof command.data !== 'object') {
      client.logs.warn(`Command ${file} has an invalid data object`);
      continue;
    }

    if (!command.execute || typeof command.execute !== 'function') {
      client.logs.warn(`Command ${file} has an invalid execute function`);
      continue;
    }

    client.commands.set(command.data.name, command);
    commandCount++;
  }

  client.logs.info(`Loaded ${commandCount} commands`);
}