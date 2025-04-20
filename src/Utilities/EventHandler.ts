import { LiteralClient, EventFile } from '../types';
import ReadFolder from './ReadFolder';
import { Events } from 'discord.js';

export default function (client: LiteralClient) {
  let eventCount = 0;
  const eventFiles = ReadFolder(`${__dirname}/../Events`);
  for (const file of eventFiles) {
    const event: EventFile = require(file).default;
    if (!event) {
      client.logs.warn(`The file at ${file} does not export a valid event.`);
      continue;
    }

    if (!event.name || typeof event.name !== 'string') {
      client.logs.warn(`Event ${file} has an invalid name`);
      continue;
    }

    if (!Object.values(Events).includes(event.name as Events)) {
      client.logs.warn(
        `Event ${file} has an invalid event name: ${event.name}`
      );
      continue;
    }

    if (!event.execute || typeof event.execute !== 'function') {
      client.logs.warn(`Event ${file} has an invalid execute function`);
      continue;
    }

    event.once
      ? client.once(event.name, (...args) => event.execute(client, ...args))
      : client.on(event.name, (...args) => event.execute(client, ...args));

    eventCount++;
  }

  client.logs.info(`Loaded ${eventCount} events`);
}
