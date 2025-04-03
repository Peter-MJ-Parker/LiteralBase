"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const ReadFolder_1 = __importDefault(require("./ReadFolder"));
function default_1(client) {
    let commandCount = 0;
    const commandFiles = (0, ReadFolder_1.default)(`${__dirname}/../Commands`);
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
