import { EmbedBuilder, MessageFlags, ModalSubmitInteraction } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  customID: 'modal:ping',
  execute: async (interaction: ModalSubmitInteraction, client: LiteralClient, args: string[]) => {
    const [userid] = args; // modal:ping_userId
    if (interaction.user.id !== userid) {
      return await interaction.reply({
        content: 'You cannot use this modal.',
        flags: MessageFlags.Ephemeral
      });
    }

    const userName = interaction.fields.getTextInputValue('input1');
    const userId = interaction.fields.getTextInputValue('input2'); //duplicate of `userid`, I know. Just for testing purposes.
    const em = EmbedBuilder.from(interaction.message!.embeds[0]);
    em.setTitle('Pong Again! 🏓')
      .setDescription(
        `**Latency:** \`${client.ws.ping}ms\`\n**Uptime:** <t:${Math.floor((Date.now() - client.uptime!) / 1000)}:R>`
      )
      .setFooter({
        text: `Requested by ${userName} (${userId})`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp();
    await interaction.message?.edit({
      embeds: [em],
      components: []
    });
    await interaction.reply({
      content: `You have submitted the modal!`,
      flags: MessageFlags.Ephemeral
    });
  }
};
