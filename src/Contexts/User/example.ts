import { createCtxUserCommand } from '#utilities';
import { MessageFlags } from 'discord.js';

export default createCtxUserCommand({
  name: 'user-test',
  async execute(interaction, client) {
    await interaction.reply({
      flags: MessageFlags.Ephemeral,
      content: `${interaction.user.tag} clicked ${interaction.targetUser.tag}`
    });
  }
});
