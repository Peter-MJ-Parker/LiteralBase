import { LiteralClient, MessageFile } from '../types';
import { logs, ReadFolder } from "#utilities";

export default async function (client: LiteralClient) {
  let messageCount = 0;
  const messageFiles = ReadFolder(`Messages`);

  for (const file of messageFiles) {
    const msg = await import(file);
    const message: MessageFile = msg.default;
    if (!message) {
      logs.warn(`The file at ${file} does not export a valid message.`);
      continue;
    }

    if (!message.name || typeof message.name !== 'string') {
      logs.warn(`Message ${file} has an invalid name`);
      continue;
    }

    if (!message.execute || typeof message.execute !== 'function') {
      logs.warn(`Message ${file} has an invalid execute function`);
      continue;
    }

    if (message.cooldown && typeof message.cooldown !== 'number') {
      logs.warn(`Message ${file} has an invalid cooldown property`);
      continue;
    }

    if (message.aliases && !Array.isArray(message.aliases)) {
      logs.warn(`Message ${file} has an invalid aliases property`);
      continue;
    }

    client.messages.set(message.name, message);
    messageCount++;

    for (const alias of message.aliases || []) {
      if (typeof alias !== 'string') {
        logs.warn(`Message ${file} has an invalid alias`);
        continue;
      }

      if (client.messages.has(alias)) {
        logs.warn(`Message ${file} has an alias that is already in use`);
        continue;
      }

      client.messages.set(alias, message);
      messageCount++;
    }
  }

  logs.info(`Loaded ${messageCount} messages`);
}
