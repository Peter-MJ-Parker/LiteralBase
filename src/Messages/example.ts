import { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  aliases: ['stats'],
  name: 'ping',
  description: 'Pong!',
  execute: async (message: Message, client: LiteralClient, args: string[]) => {
    const embed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(
        `**Latency:** \`${client.ws.ping}ms\`\n**Uptime:** <t:${Math.floor((Date.now() - client.uptime!) / 1000)}:R>`
      )
      .setColor(0x2b2d32)
      .setTimestamp();
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`button:ping_${message.author.id}_latency`)
        .setLabel('Ping')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`button:ping_${message.author.id}_menu`)
        .setLabel('Activate Menu')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`button:ping_${message.author.id}_modal`)
        .setLabel('Activate Modal')
        .setStyle(ButtonStyle.Primary)
    );
    await message.reply({ content: `${args.join(' ')}`, embeds: [embed], components: [row] });
  }
};
