import { Message, EmbedBuilder } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  aliases: ['stats'],
  name: 'ping',
  description: 'Pong!',
  execute: async (message: Message, client: LiteralClient, args: string[]) => {
    const embed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(
        `**Latency:** \`${client.ws.ping}ms\`\n**Uptime:** <t:${Math.floor(
          client.uptime! / 1000
        )}:R>`
      )
      .setColor(0x2b2d32)
      .setTimestamp();

    await message.reply({ content: `${args.join(' ')}`, embeds: [embed] });
  },
};
