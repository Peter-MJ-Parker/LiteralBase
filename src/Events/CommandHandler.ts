import { LiteralClient } from '../types';
import { ChatInputCommandInteraction } from 'discord.js';

export default {
  name: 'interactionCreate',
  execute: async (
    client: LiteralClient,
    interaction: ChatInputCommandInteraction
  ) => {
    interaction.commandName
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return await interaction.reply({
        content: 'This command does not exist.',
        flags: 64,
      });
    }

    if (!client.cooldowns.has(command.data.name)) {
      client.cooldowns.set(command.data.name, new Map());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.data.name);
    const cooldownAmount = (command.cooldown ?? 0) * 1_000;

    if (timestamps!.has(interaction.user.id)) {
      const expirationTime =
        timestamps!.get(interaction.user.id)! + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1_000);
        await interaction.deferReply({ flags: 64 }).catch(() => {});
        return interaction.editReply(
          `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`
        );
      }
    }

    timestamps!.set(interaction.user.id, now);
    setTimeout(() => timestamps!.delete(interaction.user.id), cooldownAmount);

    try {
      command.execute(interaction, client);
    } catch (error) {
      client.logs.error(error as string);
      await interaction.deferReply({ flags: 64 }).catch(() => {});
      await interaction.editReply(
        'There was an error while executing this command.'
      );
    }
  },
};
