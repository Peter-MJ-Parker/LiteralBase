"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const requiredFolders = {
    Buttons: './build/Buttons',
    Commands: './build/Commands',
    Events: './build/Events',
    Menus: './build/Menus',
    Messages: './build/Messages',
    Modals: './build/Modals',
};
for (const folder of Object.values(requiredFolders)) {
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true });
    }
}
const config_json_1 = __importDefault(require("../config.json"));
const Logs_1 = __importDefault(require("./Utilities/Logs"));
const EventLoader_1 = __importDefault(require("./Utilities/EventLoader"));
const CommandLoader_1 = __importDefault(require("./Utilities/CommandLoader"));
const RegisterCommands_1 = __importDefault(require("./Utilities/RegisterCommands"));
const client = new discord_js_1.Client({
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
});
client.config = config_json_1.default;
client.logs = Logs_1.default;
client.commands = new Map();
(0, EventLoader_1.default)(client);
(0, CommandLoader_1.default)(client);
(0, RegisterCommands_1.default)();
client.on('ready', () => {
    var _a;
    Logs_1.default.created(`Logged into ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
client.login(config_json_1.default.token);
