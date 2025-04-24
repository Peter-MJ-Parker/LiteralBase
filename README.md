# LiteralBase

LiteralBase is a Discord bot framework designed for modularity and ease of use. It supports commands, events, components, and database integration.

## Features

- **Command Handling**: Slash commands and prefix-based commands.
- **Context Menu Command Handling**: Message and User commands.
- **Event Handling**: Modular event system for Discord.js events.
- **Component Handling**: Buttons, menus, and modals.
- **Database Support**: SQLite and MongoDB integration.
- **Logging**: Customizable logging system.
- **Environment Validation**: Ensures required folders and configurations are present.

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the bot:

   - Rename `.env.ex` to `.env`.
   - Edit `.env` with your bot token, client ID, and other settings.

3. Build the project:

   ```bash
   npm run build
   ```

4. Start the bot:
   ```bash
   npm run start
   ```

## Folder Structure

- `src/Commands`: Slash commands.
- `src/Contexts`: Context Menu Commands.
- `src/Events`: Event handlers.
- `src/Buttons`: Button components.
- `src/Menus`: Menu components.
- `src/Modals`: Modal components.
- `src/Utilities`: Utility functions and handlers.

## Example Commands

# Global

- `src/Commands/Global/global-test.ts`

```ts
import { createGlobalCommand } from '#utilities';
import { ApplicationCommandType, MessageFlags } from 'discord.js';

export default createGlobalCommand({
  name: 'global-test',
  description: 'Global Command Test',
  type: ApplicationCommandType.ChatInput,
  async execute(interaction, client) {
    await interaction.reply({
      content: 'Global works!',
      flags: MessageFlags.Ephemeral
    });
  }
});
```

# Guild Only

- `src/Commands/GuildInstalled/example.ts`

```ts
import { createGuildCommand } from '#utilities';
import { ApplicationCommandType, MessageFlags } from 'discord.js';

export default createGuildCommand({
  guild_ids: [], //REQUIRED - fill in with specific guild(s) to be registered in!
  name: 'guild-only-test',
  description: 'Test command for per server command.',
  type: ApplicationCommandType.ChatInput,
  execute: async (interaction, client) => {
    await interaction.reply({
      flags: MessageFlags.Ephemeral,
      content: 'This command only works in specified guild(s)!'
    });
  }
});
```

# User Installed (Always Global)

- `src/Commands/UserInstalled/example.ts`

```ts
import { createUserCommand } from '#utilities';
import { ApplicationCommandType, MessageFlags } from 'discord.js';

export default createUserCommand({
  name: 'ui-test',
  description: 'User Installed Test command',
  type: ApplicationCommandType.User,
  async execute(interaction, client) {
    await interaction.reply({
      content: 'This command works!',
      flags: MessageFlags.Ephemeral
    });
  }
});
```

## Requirements

- Node.js v16.9.0 or higher.
- TypeScript installed globally (`npm install -g typescript`).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
