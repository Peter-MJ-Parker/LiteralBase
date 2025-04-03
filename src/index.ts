import { LiteralClient } from './types';
import { Client } from 'discord.js';
import fs from 'fs';

const requiredFolders = {
  Buttons: './build/Buttons',
  Commands: './build/Commands',
  Events: './build/Events',
  Menus: './build/Menus',
  Messages: './build/Messages',
  Modals: './build/Modals',
};

for (const folder of Object.values(requiredFolders)) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

import config from '../config.json';
import logs from './Utilities/Logs';
import EventLoader from './Utilities/EventLoader';
import CommandLoader from './Utilities/CommandLoader';
import RegisterCommands from './Utilities/RegisterCommands';

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
}) as LiteralClient;

client.config = config;
client.logs = logs;
client.commands = new Map<string, any>();

EventLoader(client);
CommandLoader(client);
RegisterCommands();

client.on('ready', () => {
  logs.created(`Logged into ${client.user?.tag}`);
});

client.login(config.token);
