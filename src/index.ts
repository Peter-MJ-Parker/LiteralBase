import { LiteralClient } from './types';
import { Client } from 'discord.js';
import ProcessHandler from './Utilities/ProcessHandler';
import EnvironmentCheck from './Utilities/EnvironmentCheck';

ProcessHandler();
EnvironmentCheck();

import config from '../config.json';
import logs from './Utilities/Logs';
import EventHandler from './Utilities/EventHandler';
import CommandLoader from './Utilities/CommandLoader';
import MessageLoader from './Utilities/MessageLoader';
import ComponentLoader from './Utilities/ComponentLoader';
import RegisterCommands from './Utilities/RegisterCommands';
import DatabaseHandler from './Utilities/DatabaseHandler';

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
}) as LiteralClient;

Object.assign(client, {
  config,
  logs,
  commands: new Map(),
  messages: new Map(),
  components: new Map(),
  cooldowns: new Map(),
});

EventHandler(client);
CommandLoader(client);
MessageLoader(client);
ComponentLoader(client);
RegisterCommands();
DatabaseHandler(client);

client.on('ready', () => {
  logs.success(`Logged into ${client.user!.tag}`);
});

client.login(config.token);
