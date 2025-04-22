import { Client } from "discord.js";
import {
  CommandFile,
  ComponentFile,
  LiteralClient as ILiteralClient,
  MessageFile,
} from "../types.js";
import {
  CommandLoader,
  ComponentLoader,
  env,
  EnvironmentCheck,
  EventHandler,
  logs,
  MessageLoader,
  ProcessHandler,
  RegisterCommands,
} from "#utilities";
import { Mongoose, Connection } from "mongoose";
import Database from "better-sqlite3";

export default class LiteralClient extends Client implements ILiteralClient {
  config: typeof env;
  commands: Map<string, CommandFile>;
  messages: Map<string, MessageFile>;
  components: Map<string, ComponentFile>;
  cooldowns: Map<string, Map<string, number>>;
  db?: Database.Database | Connection | undefined;
  constructor() {
    super({
      intents: ["Guilds", "GuildMessages", "MessageContent"],
    });
    this.db = undefined;
    this.commands = new Map();
    this.messages = new Map();
    this.components = new Map();
    this.cooldowns = new Map();
    this.config = this.ENV;
    this.login(); //No need for token here. discord does it automatically.
    this.init();
    this.connectToDatabase();
    this.once("ready", () => {
      logs.success(`Logged into ${this.user!.tag}`);
    });
  }
  private get ENV() {
    return env;
  }

  private async init() {
    ProcessHandler();
    EnvironmentCheck();
    await EventHandler(this);
    await CommandLoader(this);
    await MessageLoader(this);
    await ComponentLoader(this);
    await RegisterCommands();
  }
  private async connectToDatabase() {
    const {mongooseUri, sqlitePath} = this.ENV;
    if (mongooseUri) {
      const mongoose = new Mongoose();
      await mongoose.connect(mongooseUri, {});
      this.db = mongoose.connection;
      logs.debug("Connected to MongoDB");
    } else if (sqlitePath) {
      this.db = new Database(sqlitePath);
      logs.debug("Connected to SQLite");
    } else {
      this.db = undefined;
      logs.warn("No database config set - skipping...");
    }
  }
  public get database() {
    return this.db;
  }
}
