import { logs } from "#utilities";
import type { ContextUserFile, LiteralClient } from "../types";
import type { UserContextMenuCommandInteraction } from "discord.js";

export default {
  name: "interactionCreate",
  execute: async (
    client: LiteralClient,
    interaction: UserContextMenuCommandInteraction
  ) => {
    if (!interaction.isUserContextMenuCommand()) return;
    let command = client.contexts.get(
      interaction.commandName
    ) as ContextUserFile;

    if (!command) {
      return await interaction.reply({
        content: "This command does not exist.",
        flags: 64,
      });
    }

    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Map());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown ?? 0) * 1_000;

    if (timestamps!.has(interaction.user.id)) {
      const expirationTime =
        timestamps!.get(interaction.user.id)! + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1_000);
        await interaction.deferReply({ flags: 64 }).catch(() => {});
        return interaction.editReply(
          `Please wait, you are on a cooldown for \`${command.name}\`. You can use it again <t:${expiredTimestamp}:R>.`
        );
      }
    }

    timestamps!.set(interaction.user.id, now);
    setTimeout(() => timestamps!.delete(interaction.user.id), cooldownAmount);

    try {
      command.execute(interaction, client);
    } catch (error) {
      logs.error(error as string);
      await interaction.deferReply({ flags: 64 }).catch(() => {});
      await interaction.editReply(
        "There was an error while executing this command."
      );
    }
  },
};
