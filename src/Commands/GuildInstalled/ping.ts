import { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { LiteralClient } from '../../types';
import { createGuildCommand } from '#utilities';

export default createGuildCommand({
  name: 'ping',
  description: 'Pong!',
  aliases: ['stats'],
  cooldown: 5,
  guild_ids: ['716249660838379541'],
  execute: async (interaction: ChatInputCommandInteraction, client: LiteralClient) => {
    const embed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(
        `**Latency:** \`${client.ws.ping}ms\`\n**Uptime:** <t:${Math.floor((Date.now() - client.uptime!) / 1000)}:R>`
      )
      .setColor(0x2b2d32)
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`button:ping_${interaction.user.id}_latency`)
        .setLabel('Ping')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`button:ping_${interaction.user.id}_menu`)
        .setLabel('Activate Menu')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`button:ping_${interaction.user.id}_modal`)
        .setLabel('Activate Modal')
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
});
