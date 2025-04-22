import { createGuildCommand } from "#utilities";
import { ApplicationCommandOptionType } from "discord.js";

export default createGuildCommand({
    name: "say",
    description: "Say something in the channel",
    options: [
        {
            name: "message",
            description: "The message to send",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    async execute(interaction, client) {
        const message = interaction.options.getString("message", true);
        await interaction.reply(message);
    },

})