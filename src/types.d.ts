import {
  Client,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
  Message,
  AnySelectMenuInteraction,
} from 'discord.js';
import config from '../config.json';
import logs from './Utilities/Logs';
import Database from 'better-sqlite3';

export interface LiteralClient extends Client {
  config: typeof config;
  logs: typeof logs;
  commands: Map<CommandFile.name, CommandFile>;
  messages: Map<MessageFile.name, MessageFile>;
  components: Map<ComponentFile.customID, ComponentFile>;
  db?: Database.Database;
  cooldowns: Map<string, Map<string, number>>;
}

export interface EventFile {
  name: string;
  once?: boolean;
  execute: (client: LiteralClient, ...args: any[]) => void;
}

export interface MessageFile {
  cooldown?: number;
  aliases?: string[];
  name: string;
  execute: (message: Message, client: LiteralClient, args?: string[]) => void;
}

export interface CommandFile {
  cooldown?: number;
  dev?: boolean;
  data: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
    client: LiteralClient
  ) => void;
}

export interface ComponentFile {
  customID: string;
  execute: (
    interaction:
      | ButtonInteraction
      | AnySelectMenuInteraction
      | ModalSubmitInteraction,
    client: LiteralClient,
    args?: string[]
  ) => void;
}
