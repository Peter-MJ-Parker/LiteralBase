import { createCtxMsgCommand, createGlobalCommand } from "#utilities";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createGlobalCommand({
    name: 'global-test',
    description: 'Global Command Test',
    type: ApplicationCommandType.ChatInput,
    async execute(interaction, client) {
        await interaction.reply({
            content: 'Global works!',
            flags: MessageFlags.Ephemeral
        })
    },
})