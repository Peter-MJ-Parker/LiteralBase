# LiteralBase Bot

Welcome to **LiteralBase**, a foundational bot framework designed to streamline the development of custom bots. This repository provides a robust starting point for building bots with modular and extensible features.

## Features

- **Modular Design**: Easily add or remove features.
- **Command & Event Handlers**: Built-in support for commands and events.
- **Configuration Management**: Simple configuration using environment variables.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

If you want to only use JS, you can delete the src folder and the tsconfig.json file. If you want to use TypeScript, you can keep the src folder and the tsconfig.json file.

1. Clone the repository:

```bash
git clone https://github.com/literallybase/LiteralBase.git
cd LiteralBase
```

2. Install dependencies:

```bash
npm install
```

3. Configure the bot:

- Update the configuration values in the `config.json` file.

4. Start the bot:

```bash
npm run build
npm run start
```

## Usage

- Modify the `src` directory to add your custom logic.
- Refer to the documentation for detailed instructions on extending the bot.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
