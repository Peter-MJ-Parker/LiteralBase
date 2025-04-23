export { env } from "./env.js";
import CommandLoader from "./CommandLoader.js";
import ComponentLoader from "./ComponentLoader.js";
import MessageLoader from "./MessageLoader.js";
import EventHandler from "./EventHandler.js";
import RegisterCommands from "./RegisterCommands.js";
import ProcessHandler from "./ProcessHandler.js";
import EnvironmentCheck from "./EnvironmentCheck.js";
import ContextHandler from "./ContextLoader.js";
import LiteralClient from "../Lib/LiteralClient.js";
import { Logs } from "./Logs.js";
import ReadFolder from "./ReadFolder.js";
import { CommandFile, ContextMessageFile, ContextType, ContextUserFile, IntegrationType } from "../types.js";

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
  ReadFolder,
};
export function createGuildCommand(
  commandData: CommandFile
) {
  return {
    ...commandData,
    integration_types: [IntegrationType.GUILD_INSTALL],
    contexts: [ContextType.GUILD],
  };
}

export function createCtxMsgCommand(commandData: ContextMessageFile) {
  return {
    ...commandData,
  }
}

export function createCtxUserCommand(commandData: ContextUserFile) {
  return {
    ...commandData
  }
}

export function createUserCommand(commandData: CommandFile) {
  return {
    ...commandData,
    integration_types: [IntegrationType.USER_INSTALL],
    contexts: [ContextType.BOT_DM, ContextType.PRIVATE_CHANNEL],
  };
}

export function createUserInGuildCommand(commandData: CommandFile) {
  return {
    ...commandData,
    integration_types: [IntegrationType.USER_INSTALL],
    contexts: [
      ContextType.GUILD,
      ContextType.BOT_DM,
      ContextType.PRIVATE_CHANNEL,
    ],
  };
}

export function createGlobalCommand(commandData: CommandFile) {
  return {
    ...commandData,
    integration_types: [
      IntegrationType.GUILD_INSTALL,
      IntegrationType.USER_INSTALL,
    ],
    contexts: [
      ContextType.GUILD,
      ContextType.BOT_DM,
      ContextType.PRIVATE_CHANNEL,
    ],
  };
}
