import { createCtxMsgCommand } from '#utilities';
import { MessageFlags } from 'discord.js';

export default createCtxMsgCommand({
  name: 'msg-test',
  async execute(interaction, client) {
    await interaction.reply({
      flags: MessageFlags.Ephemeral,
      content: `${interaction.user.tag} clicked ${interaction.targetMessage.url}`
    });
  }
});
