import { logs } from "#utilities";
import fs from 'fs';
import path from 'path';

function LogError(err: Error, type: string) {
  const logsPath = path.join(process.cwd(), 'Logs');
  if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logFilePath = path.join(logsPath, `${timestamp}.log`);

  const errorDetails = `[${type}] ${err.name}: ${err.message}\n${
    err.stack ?? ''
  }`;
  fs.writeFileSync(logFilePath, errorDetails, 'utf8');
}

export default function () {
  process.on('SIGINT', () => {
    logs.error('SIGINT: Exiting...');
    process.exit();
  });

  process.on('uncaughtException', (err) => {
    logs.error(`UNCAUGHT EXCEPTION: ${err}`);
    LogError(err, 'uncaughtException');
  });

  process.on('SIGTERM', () => {
    logs.error('SIGTERM: Exiting...');
    process.exit();
  });

  process.on('unhandledRejection', (err) => {
    logs.error(`UNHANDLED REJECTION: ${err}`);
    LogError(err as Error, 'unhandledRejection');
  });

  process.on('warning', (warning) => {
    logs.warn(`WARNING: ${warning.name}: ${warning.message}`);
    LogError(warning, 'warning');
  });

  process.on('uncaughtReferenceError', (err) => {
    logs.error(err);
    LogError(err, 'uncaughtReferenceError');
  });
}
