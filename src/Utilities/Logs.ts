import { inspect } from 'node:util';
import fs from 'fs';
import path from 'path';

export class Logs {
  private logFilePath: string;

  constructor() {
    const logsPath = path.join(process.cwd(), 'Logs');
    if (!fs.existsSync(logsPath)) {
      fs.mkdirSync(logsPath, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFilePath = path.join(logsPath, `log-${timestamp}.txt`);
  }

  private color: { [key: string]: string } = {
    red: '\x1b[31m',
    orange: '\x1b[38;5;202m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
  };

  private getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private writeToFile(message: string) {
    fs.appendFileSync(this.logFilePath, message + '\n', 'utf8');
  }

  private write(message = '', prefix = '', colors = true) {
    const properties = inspect(message, {
      depth: 3,
      colors: Boolean(colors && typeof message !== 'string')
    });

    const regex = /^\s*["'`](.*)["'`]\s*\+?$/gm;

    const lines = properties.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(regex, '$1');
      const logLine = i === 0 ? prefix + line : line;

      // Write to console
      console.log(logLine);

      // Write to file
      this.writeToFile(logLine);
    }
  }

  public info(message: string) {
    const prefix = `${this.color.yellow}[${this.getTimestamp()}]${this.color.reset} `;
    this.write(message, prefix);
  }

  public warn(message: string) {
    const prefix = `${this.color.orange}[${this.getTimestamp()}]${this.color.reset} `;
    this.write(message, prefix);
  }

  public error(message: string) {
    const prefix = `${this.color.red}[${this.getTimestamp()}]${this.color.reset} `;
    this.write(message, prefix, false);
  }

  public success(message: string) {
    const prefix = `${this.color.green}[${this.getTimestamp()}]${this.color.reset} `;
    this.write(message, prefix);
  }

  public debug(message: string) {
    const prefix = `${this.color.blue}[${this.getTimestamp()}]${this.color.reset} `;
    this.write(message, prefix);
  }

  public db(...args: any[]) {
    const message = args.join(' ');
    const prefix = `${this.color.blue}[${this.getTimestamp()}]${this.color.reset} `;
    this.write(message, prefix, false);
  }
}
