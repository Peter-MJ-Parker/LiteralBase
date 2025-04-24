import { createUserCommand } from '#utilities';
import { MessageFlags } from 'discord.js';

export default createUserCommand({
  name: 'ui-test',
  description: 'User Installed Test command',
  async execute(interaction, client) {
    await interaction.reply({
      content: 'This command works!',
      flags: MessageFlags.Ephemeral
    });
  }
});
