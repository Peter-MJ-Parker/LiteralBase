import { ModalSubmitInteraction } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  customID: 'modal:ping',
  execute: async (
    interaction: ModalSubmitInteraction,
    client: LiteralClient,
    args: string[]
  ) => {
    if (interaction.user.id !== args[0]) {
      return await interaction.reply({
        content: 'You cannot use this modal.',
        flags: 64,
      });
    }

    await interaction.reply('Pong!');
  },
};
