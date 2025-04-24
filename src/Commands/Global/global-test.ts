import { createGlobalCommand } from '#utilities';
import { MessageFlags } from 'discord.js';

export default createGlobalCommand({
  name: 'global-test',
  description: 'Global Command Test',
  async execute(interaction, client) {
    await interaction.reply({
      content: 'Global works!',
      flags: MessageFlags.Ephemeral
    });
  }
});
