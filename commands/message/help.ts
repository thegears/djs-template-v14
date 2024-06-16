import type { MessageCommand } from "../../typings";
import { messageCommands } from "../../loaders/commands";
import { EmbedBuilder } from "discord.js";


const command: MessageCommand = {
	name: "help",
	withPrefix: true,
	aliases: ["h"],
	description: "Help command",
	run: async ({ message }) => {

		const commands: MessageCommand[] = [...messageCommands.values()];

		console.log(commands)

		const embed = new EmbedBuilder()
			.setTimestamp()
			.setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
			.addFields(
				commands.map(c => ({ name: c.name, value: c.description, inline: true })),
			)

		message.reply({
			embeds: [embed]
		})
	}
}

export default command;
