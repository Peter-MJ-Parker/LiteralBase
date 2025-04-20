import mongoose from 'mongoose';
import Database from 'better-sqlite3';
import { mongooseUri, sqlitePath } from '../../config.json';
import logs from './Logs';
import { LiteralClient } from '../types';

export default function (client: LiteralClient) {
  if (mongooseUri && sqlitePath) {
    return logs.warn('Both MongoDB and SQLite paths are set - skipping...');
  }

  if (mongooseUri) {
    mongoose
      .connect(mongooseUri, {})
      .then(() => logs.debug('Connected to MongoDB'))
      .catch((err) => logs.error(`Failed to connect to MongoDB: ${err}`));
  } else if (sqlitePath) {
    const db = new Database(sqlitePath, { verbose: logs.db, timeout: 5000 }); // remove verbose to disable database logging
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    client.db = db;
    logs.debug('Connected to SQLite');
  } else {
    logs.warn('No database config set - skipping...');
  }
}
