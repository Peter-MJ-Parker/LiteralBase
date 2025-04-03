import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  dev: true, // makes it so this command is only registered in the dev guild
  data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
  execute: async (
    interaction: ChatInputCommandInteraction,
    client: LiteralClient
  ) => {
    await interaction.reply('Pong!');
  },
};
