import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ModalSubmitInteraction,
} from 'discord.js';
import { LiteralClient } from '../types';
import { logs } from '#utilities';

export default {
  name: 'interactionCreate',
  execute: async (
    client: LiteralClient,
    interaction:
      | ButtonInteraction
      | AnySelectMenuInteraction
      | ModalSubmitInteraction
  ) => {
    if (interaction.isCommand()) return;
    const args = interaction.customId.split('_').slice(1);
    const component = client.components.get(interaction.customId.split('_')[0]);
    if (!component) {
      return await interaction.reply({
        content: 'This component was not found.',
        flags: 64,
      });
    }

    try {
      component.execute(interaction, client, args);
    } catch (error) {
      logs.error(error as string);
      await interaction.deferReply({ flags: 64 });
      await interaction.editReply(
        'There was an error while executing this component.'
      );
    }
  },
};
