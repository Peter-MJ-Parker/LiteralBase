import fs from 'fs';
import logs from './Logs';
import config from '../../config.json';

export default function (errors: string[] = []) {
  const requiredFolders = {
    Buttons: './build/Buttons',
    Commands: './build/Commands',
    Events: './build/Events',
    Menus: './build/Menus',
    Messages: './build/Messages',
    Modals: './build/Modals',
  };

  for (const folder of Object.values(requiredFolders)) {
    if (!fs.existsSync(folder)) {
      logs.error(`Missing ${folder} folder - creating...`);
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  const configTemplate = {
    token: 'string',
    clientId: 'string',
    devGuild: 'string',
    prefix: 'string',
    // mongooseUri: 'string',
    // sqlitePath: 'string',
  };

  for (const [key, value] of Object.entries(configTemplate)) {
    if (!config[key as keyof typeof config]) {
      errors.push(`Missing ${key} in config.json`);
    }

    if (typeof config[key as keyof typeof config] !== value) {
      errors.push(`Invalid type for ${key} - expected ${value}`);
    }
  }

  if (errors.length > 0) {
    logs.error('Environment check failed with the following errors:');
    errors.forEach((error) => logs.error(error));
    process.exit(1);
  }
}
