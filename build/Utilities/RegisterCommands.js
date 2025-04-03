"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const config_json_1 = require("../../config.json");
const discord_js_1 = require("discord.js");
const ReadFolder_1 = __importDefault(require("./ReadFolder"));
const Logs_1 = __importDefault(require("./Logs"));
const commands = [];
const devCommands = [];
const commandFiles = (0, ReadFolder_1.default)(`${__dirname}/../Commands`);
for (const file of commandFiles) {
    const command = require(file).default;
    if (!command) {
        Logs_1.default.warn(`The file at ${file} does not export a valid command.`);
        continue;
    }
    if (command['data'] && command['execute']) {
        commands.push(command.data.toJSON());
    }
    else if (command['data'] && command['execute'] && command['dev']) {
        devCommands.push(command.data.toJSON());
    }
    else {
        Logs_1.default.warn(`The command at ${file} is missing a required "data" or "execute" property.`);
    }
}
const rest = new discord_js_1.REST().setToken(config_json_1.token);
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!commands.length && !devCommands.length) {
            Logs_1.default.warn('No commands found to register.');
            return;
        }
        try {
            Logs_1.default.debug(`Started refreshing ${commands.length + devCommands.length} application (/) commands.`);
            const data = yield rest.put(discord_js_1.Routes.applicationCommands(config_json_1.clientId), {
                body: commands,
            });
            const devData = yield rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.clientId, config_json_1.devGuild), { body: devCommands });
            Logs_1.default.debug(`Successfully reloaded ${data.length + devData.length} application (/) commands.`);
        }
        catch (error) {
            Logs_1.default.error(`Failed to register commands: ${error}`);
        }
    });
}
