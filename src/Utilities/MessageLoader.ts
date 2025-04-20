import { LiteralClient, MessageFile } from '../types';
import ReadFolder from './ReadFolder';

export default function (client: LiteralClient) {
  let messageCount = 0;
  const messageFiles = ReadFolder(`${__dirname}/../Messages`);

  for (const file of messageFiles) {
    const message: MessageFile = require(file).default;
    if (!message) {
      client.logs.warn(`The file at ${file} does not export a valid message.`);
      continue;
    }

    if (!message.name || typeof message.name !== 'string') {
      client.logs.warn(`Message ${file} has an invalid name`);
      continue;
    }

    if (!message.execute || typeof message.execute !== 'function') {
      client.logs.warn(`Message ${file} has an invalid execute function`);
      continue;
    }

    if (message.cooldown && typeof message.cooldown !== 'number') {
      client.logs.warn(`Message ${file} has an invalid cooldown property`);
      continue;
    }

    if (message.aliases && typeof message.aliases !== 'object') {
      client.logs.warn(`Message ${file} has an invalid aliases property`);
      continue;
    }

    client.messages.set(message.name, message);
    messageCount++;

    for (const alias of message.aliases || []) {
      if (typeof alias !== 'string') {
        client.logs.warn(`Message ${file} has an invalid alias`);
        continue;
      }

      if (client.messages.has(alias)) {
        client.logs.warn(`Message ${file} has an alias that is already in use`);
        continue;
      }

      client.messages.set(alias, message);
      messageCount++;
    }
  }

  client.logs.info(`Loaded ${messageCount} messages`);
}
