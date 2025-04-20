import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import { LiteralClient } from '../types';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
  dev: true, // makes it so this command is only registered in the dev guild
  execute: async (
    interaction: ChatInputCommandInteraction,
    client: LiteralClient
  ) => {
    const embed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(
        `**Latency:** \`${client.ws.ping}ms\`\n**Uptime:** <t:${Math.floor(
          client.uptime! / 1000
        )}:R>`
      )
      .setColor(0x2b2d32)
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`button:ping_123`)
        .setLabel('Ping')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
