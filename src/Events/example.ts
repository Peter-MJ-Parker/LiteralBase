import { Message } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  name: 'messageCreate',
  once: true, // set to true if you want the event to only run once
  execute: async (client: LiteralClient, message: Message) => {
    if (!message.author.bot && message.content === '!ping') {
      await message.reply('Pong!');
    }
  },
};
