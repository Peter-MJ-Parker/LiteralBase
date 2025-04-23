import { createGuildCommand } from "#utilities";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

export default createGuildCommand({
  name: "say",
  description: "Say something in the channel",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "message",
      description: "The message to send",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  guild_ids: ["716249660838379541"],
  async execute(interaction, client) {
    const message = interaction.options.getString("message", true);
    await interaction.reply(message);
  },
});
