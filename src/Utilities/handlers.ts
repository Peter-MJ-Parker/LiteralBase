export { env } from './env.js';
import CommandLoader from './CommandLoader.js';
import ComponentLoader from './ComponentLoader.js';
import MessageLoader from './MessageLoader.js';
import EventHandler from './EventHandler.js';
import RegisterCommands from './RegisterCommands.js';
import ProcessHandler from './ProcessHandler.js';
import EnvironmentCheck from './EnvironmentCheck.js';
import ContextHandler from './ContextLoader.js';
import LiteralClient from '../Lib/LiteralClient.js';
import { Logs } from './Logs.js';
import ReadFolder from './ReadFolder.js';
import { CommandFile, ContextMessageFile, ContextType, ContextUserFile, IntegrationType } from '../types.js';
import { ApplicationCommandType } from 'discord.js';

const logs: Logs = new Logs();
export {
  CommandLoader,
  ComponentLoader,
  ContextHandler,
  MessageLoader,
  EventHandler,
  RegisterCommands,
  ProcessHandler,
  EnvironmentCheck,
  LiteralClient,
  logs,
  ReadFolder
};
export function createGuildCommand<T extends { guild_ids: string[] }>(commandData: CommandFile & T) {
  return {
    ...commandData,
    type: ApplicationCommandType.ChatInput,
    integration_types: [IntegrationType.GUILD_INSTALL],
    contexts: [ContextType.GUILD]
  };
}

export function createCtxMsgCommand(commandData: Omit<ContextMessageFile, ' guild_ids'>) {
  return {
    ...commandData,
    type: ApplicationCommandType.Message
  };
}

export function createCtxUserCommand(commandData: Omit<ContextUserFile, ' guild_ids'>) {
  return {
    ...commandData,
    type: ApplicationCommandType.User
  };
}

export function createUserCommand(commandData: Omit<CommandFile, ' guild_ids'>) {
  return {
    ...commandData,
    type: ApplicationCommandType.ChatInput,
    integration_types: [IntegrationType.USER_INSTALL],
    contexts: [ContextType.BOT_DM, ContextType.PRIVATE_CHANNEL]
  };
}

export function createUserInGuildCommand(commandData: Omit<CommandFile, ' guild_ids'>) {
  return {
    ...commandData,
    type: ApplicationCommandType.ChatInput,
    integration_types: [IntegrationType.USER_INSTALL],
    contexts: [ContextType.GUILD, ContextType.BOT_DM, ContextType.PRIVATE_CHANNEL]
  };
}

export function createGlobalCommand(commandData: Omit<CommandFile, 'guild_ids'>) {
  return {
    ...commandData,
    type: ApplicationCommandType.ChatInput,
    integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
    contexts: [ContextType.GUILD, ContextType.BOT_DM, ContextType.PRIVATE_CHANNEL]
  };
}
