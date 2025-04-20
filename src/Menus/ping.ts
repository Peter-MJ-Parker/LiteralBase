import { StringSelectMenuInteraction } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  customID: 'select:ping',
  execute: async (
    interaction: StringSelectMenuInteraction,
    client: LiteralClient,
    args: string[]
  ) => {
    if (interaction.user.id !== args[0]) {
      return await interaction.reply({
        content: 'You cannot use this menu.',
        flags: 64,
      });
    }

    await interaction.reply('Pong!');
  },
};
