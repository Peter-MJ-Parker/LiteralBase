import { LiteralClient } from '../types';
import { ChatInputCommandInteraction } from 'discord.js';

export default {
  name: 'interactionCreate',
  execute: async (
    client: LiteralClient,
    interaction: ChatInputCommandInteraction
  ) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return await interaction.reply({
        content: 'This command does not exist.',
        flags: 64,
      });
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      client.logs.error(error as string);
      await interaction.reply({
        content: 'There was an error while executing this command.',
        flags: 64,
      });
    }
  },
};
