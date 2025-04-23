import { createCtxMsgCommand } from "#utilities";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCtxMsgCommand({
    name: 'msg-test',
    type: ApplicationCommandType.Message,
    async execute(interaction, client) {
        await interaction.reply({
            flags: MessageFlags.Ephemeral,
            content: `${interaction.user.tag} clicked ${interaction.targetMessage.url}`
        })
    },
})