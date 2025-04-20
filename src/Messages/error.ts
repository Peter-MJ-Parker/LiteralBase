import { Message } from 'discord.js';
import { LiteralClient } from '../types';

export default {
  name: 'error',
  execute: async (message: Message, client: LiteralClient, args: string[]) => {
    // @ts-ignore
    foo();
  },
};
