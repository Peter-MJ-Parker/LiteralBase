import { createUserCommand } from '#utilities';
import { ApplicationCommandType, MessageFlags } from 'discord.js';

export default createUserCommand({
  name: 'ui-test',
  description: 'User Installed Test command',
  type: ApplicationCommandType.User,
  async execute(interaction, client) {
    await interaction.reply({
      content: 'This command works!',
      flags: MessageFlags.Ephemeral
    });
  }
});
