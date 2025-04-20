# LiteralBase

LiteralBase is a Discord bot framework designed for modularity and ease of use. It supports commands, events, components, and database integration.

## Features

- **Command Handling**: Slash commands and prefix-based commands.
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
   - Edit `config.json` with your bot token, client ID, and other settings.

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the bot:
   ```bash
   npm start
   ```

## Folder Structure

- `src/Commands`: Slash commands.
- `src/Events`: Event handlers.
- `src/Buttons`: Button components.
- `src/Menus`: Menu components.
- `src/Modals`: Modal components.
- `src/Utilities`: Utility functions and handlers.

## Requirements

- Node.js v16.9.0 or higher.
- TypeScript installed globally (`npm install -g typescript`).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
