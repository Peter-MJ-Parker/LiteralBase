"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const ReadFolder_1 = __importDefault(require("./ReadFolder"));
const discord_js_1 = require("discord.js");
function default_1(client) {
    let eventCount = 0;
    const eventFiles = (0, ReadFolder_1.default)(`${__dirname}/../Events`);
    for (const file of eventFiles) {
        const event = require(file).default;
        if (!event.name || typeof event.name !== 'string') {
            client.logs.warn(`Event ${file} has an invalid name`);
            continue;
        }
        if (!Object.values(discord_js_1.Events).includes(event.name)) {
            client.logs.warn(`Event ${file} has an invalid event name: ${event.name}`);
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
