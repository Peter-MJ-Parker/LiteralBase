import { BaseInteraction, Client } from 'discord.js';
import config from '../config.json';
import logs from './Utilities/Logs';

export interface LiteralClient extends Client {
  config: typeof config;
  logs: typeof logs;
  commands: Map<string, any>;
}