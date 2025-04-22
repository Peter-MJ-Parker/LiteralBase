import {
  ActionRowBuilder,
  EmbedBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { LiteralClient } from "../types";

export default {
  customID: "select:ping",
  execute: async (
    interaction: StringSelectMenuInteraction,
    client: LiteralClient,
    args: string[]
  ) => {
    const [userId] = args; // select:ping_userId_action
    if (interaction.user.id !== userId) {
      return await interaction.reply({
        content: "You cannot use this menu.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const option = interaction.values[0]; // selected option
    switch (option) {
      case "option1":
        const em = EmbedBuilder.from(interaction.message.embeds[0]);
        em.setTitle("Pong Again! 🏓");
        const Em = em.setDescription(
          `**Latency:** \`${client.ws.ping}ms\`\n**Uptime:** <t:${Math.floor(
            client.uptime! / 1000
          )}:R>`
        );
        em.setTimestamp();
        await interaction.update({
          embeds: [Em],
          components: [
            new ActionRowBuilder<StringSelectMenuBuilder>({
              components: [
                new StringSelectMenuBuilder()
                  .setCustomId(`select:ping_${interaction.user.id}`)
                  .setPlaceholder("Select an option")
                  .addOptions([
                    {
                      label: "modal",
                      value: "option2",
                      description: "Open a modal",
                      emoji: "📝",
                    },
                  ]),
              ],
            }),
          ],
        });
        break;
      case "option2":
        await interaction.showModal({
          customId: `modal:ping_${interaction.user.id}`,
          title: "Ping",
          components: [
            new ActionRowBuilder<TextInputBuilder>({
              components: [
                new TextInputBuilder()
                  .setCustomId(`input1`)
                  .setLabel("What is your username?")
                  .setStyle(TextInputStyle.Short)
                  .setPlaceholder("Type your username here " + interaction.user.username)
                  .setMinLength(1)
                  .setMaxLength(100)
                  .setRequired(true),
              ],
            }),
            new ActionRowBuilder<TextInputBuilder>({
              components: [
                new TextInputBuilder()
                  .setCustomId(`input2`)
                  .setLabel("What is your user id?")
                  .setStyle(TextInputStyle.Short)
                  .setPlaceholder("Type your user id here " + userId)
                  .setMinLength(1)
                  .setMaxLength(100)
                  .setRequired(true),
              ],
            }),
          ],
        });
        break;
      default:
        await interaction.reply({
          content: "Invalid option.",
          flags: MessageFlags.Ephemeral,
        });
        break;
    }
  },
};
