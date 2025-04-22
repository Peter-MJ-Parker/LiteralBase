import {
  Client,
  ChatInputCommandInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
  Message,
  AnySelectMenuInteraction,
  ApplicationCommandOption,
} from 'discord.js';
import Database from 'better-sqlite3';
import { Connection } from 'mongoose';
import { env } from '#utilities';

export interface LiteralClient extends Client {
  config: typeof env;
  commands: Map<CommandFile["name"], CommandFile>;
  messages: Map<MessageFile["name"], MessageFile>;
  components: Map<ComponentFile["customID"], ComponentFile>;
  db?: Database.Database | Connection | undefined;
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

export enum IntegrationType {
  "GUILD_INSTALL" = 0,
  "USER_INSTALL" = 1
}

export enum ContextType {
  "GUILD" = 0,
  "BOT_DM" = 1,
  "PRIVATE_CHANNEL" = 2
}

export interface CommandFile {
  name: string;
  aliases?: string[];
  dev?: boolean;
  cooldown?: number;
  description: string;
  options?: ApplicationCommandOption[];
  execute: (
    interaction: ChatInputCommandInteraction,
    client: LiteralClient
  ) => void;
  toJSON?: () => JSON;
}

export interface GuildSlashCommandData extends CommandFile {
  integration_types: IntegrationType.GUILD_INSTALL[];
  contexts: ContextType.GUILD[];
}

export interface UserSlashCommandData extends CommandFile {
  integration_types: IntegrationType.USER_INSTALL[];
  contexts: (ContextType.BOT_DM | ContextType.PRIVATE_CHANNEL)[];
}

export interface UserInGuildSlashCommandData extends CommandFile {
  integration_types: IntegrationType.USER_INSTALL[];
  contexts: ContextType[];
}
export interface GlobalSlashCommandData extends CommandFile {
  integration_types: IntegrationType[];
  contexts: ContextType[];
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

// Button, SelectMenu, and Modal types are currently unused, but are here for future use.
export interface ModalFile {
  customID: string;
  execute: (
    interaction: ModalSubmitInteraction,
    client: LiteralClient,
    args?: string[]
  ) => void;
}
export interface SelectMenuFile {
  customID: string;
  execute: (
    interaction: AnySelectMenuInteraction,
    client: LiteralClient,
    args?: string[]
  ) => void;
}
export interface ButtonFile {
  customID: string;
  execute: (
    interaction: ButtonInteraction,
    client: LiteralClient,
    args?: string[]
  ) => void;
}