import { Message } from 'discord.js';
import { LiteralClient } from '../types';
import { env, logs } from '#utilities';

export default {
  name: 'messageCreate',
  execute: async (client: LiteralClient, message: Message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(env.prefix)) return;
    const args: string[] = message.content
      .slice(env.prefix.length)
      .trim()
      .split(' ');

    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.messages.get(commandName);
    if (!command) return;

    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Map());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown ?? 0) * 1_000;

    if (timestamps!.has(message.author.id)) {
      const expirationTime =
        timestamps!.get(message.author.id)! + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1_000);
        return message.reply(
          `Please wait, you are on a cooldown for \`${command.name}\`. You can use it again <t:${expiredTimestamp}:R>.`
        );
      }
    }

    timestamps!.set(message.author.id, now);
    setTimeout(() => timestamps!.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, client, args);
    } catch (error) {
      logs.error(error as string);
      await message.reply('There was an error while executing this command.');
    }
  },
};
