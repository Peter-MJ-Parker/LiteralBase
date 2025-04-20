import { ButtonInteraction } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  customID: 'button:ping',
  execute: async (
    interaction: ButtonInteraction,
    client: LiteralClient,
    args: string[]
  ) => {
    if (interaction.user.id !== args[0]) {
      return await interaction.reply({
        content: 'You cannot use this button.',
        flags: 64,
      });
    }

    await interaction.reply('Pong!');
  },
};
