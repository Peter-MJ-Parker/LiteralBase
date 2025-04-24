import { createGuildCommand } from '#utilities';
import { MessageFlags } from 'discord.js';

export default createGuildCommand({
  guild_ids: ['1231307168410763426'], //fill in with specific guild to be registered in!
  name: 'guild-only-test',
  description: 'Test command for per server command.',
  execute: async (interaction, client) => {
    await interaction.reply({
      flags: MessageFlags.Ephemeral,
      content: 'This command only works in specified guild(s)!'
    });
  }
});
