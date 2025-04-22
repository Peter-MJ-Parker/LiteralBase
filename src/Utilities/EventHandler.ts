import { LiteralClient, EventFile } from "../types";
import { logs, ReadFolder } from "#utilities";
import { Events } from "discord.js";

export default async function (client: LiteralClient) {
  let eventCount = 0;
  const eventFiles = ReadFolder(`Events`);
  for (const file of eventFiles) {
    const ev = await import(file);
    const event: EventFile = ev.default;
    if (!event) {
      logs.warn(`The file at ${file} does not export a valid event.`);
      continue;
    }

    if (!event.name || typeof event.name !== "string") {
      logs.warn(`Event ${file} has an invalid name`);
      continue;
    }

    if (!Object.values(Events).includes(event.name as Events)) {
      logs.warn(
        `Event ${file} has an invalid event name: ${event.name}`
      );
      continue;
    }

    if (!event.execute || typeof event.execute !== "function") {
      logs.warn(`Event ${file} has an invalid execute function`);
      continue;
    }

    event.once
      ? client.once(event.name, (...args) => event.execute(client, ...args))
      : client.on(event.name, (...args) => event.execute(client, ...args));

    eventCount++;
  }

  logs.info(`Loaded ${eventCount} events`);
}
