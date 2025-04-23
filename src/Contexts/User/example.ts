import { createCtxUserCommand } from "#utilities";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCtxUserCommand({
    name: 'user-test',
    type: ApplicationCommandType.User,
    async execute(interaction, client) {
        await interaction.reply({
            flags: MessageFlags.Ephemeral,
            content: `${interaction.user.tag} clicked ${interaction.targetUser.tag}`
        })
    },
})