import { inspect } from "node:util";

export class Logs {
  constructor() {}
  private color: { [key: string]: string } = {
    red: "\x1b[31m",
    orange: "\x1b[38;5;202m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    reset: "\x1b[0m",
  };

  private getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private write(message = "", prefix = "", colors = true) {
    const properties = inspect(message, {
      depth: 3,
      colors: Boolean(colors && typeof message !== "string"),
    });

    const regex = /^\s*["'`](.*)["'`]\s*\+?$/gm;

    const lines = properties.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(regex, "$1");
      if (i === 0) {
        console.log(prefix + line);
      } else {
        console.log(line);
      }
    }
  }

  public info(message: string) {
    return this.write(
      message,
      `${this.color.yellow}[${this.getTimestamp()}]${this.color.reset} `
    );
  }

  public warn(message: string) {
    return this.write(
      message,
      `${this.color.orange}[${this.getTimestamp()}]${this.color.reset} `
    );
  }

  public error(message: string) {
    return this.write(
      message,
      `${this.color.red}[${this.getTimestamp()}]${this.color.reset} `,
      false
    );
  }

  public success(message: string) {
    return this.write(
      message,
      `${this.color.green}[${this.getTimestamp()}]${this.color.reset} `
    );
  }

  public debug(message: string) {
    return this.write(
      message,
      `${this.color.blue}[${this.getTimestamp()}]${this.color.reset} `
    );
  }

  public db(...args: any[]) {
    const message = args.join(" ");
    return this.write(
      message,
      `${this.color.blue}[${this.getTimestamp()}]${this.color.reset} `,
      false
    );
  }
}
