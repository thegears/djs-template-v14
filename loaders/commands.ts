import fs from 'fs';
import type { LoaderFunction, MessageCommand, SlashCommand } from '../typings';
import config from '../config.json' with { type: 'json' };

export const slashCommands = new Map<string, SlashCommand>();

const commands: LoaderFunction = async function({ client }) {

	const messageCommands = new Map<string, MessageCommand>();

	const messageCommandFiles = fs
		.readdirSync('./commands/message')
		.filter((file) => file.endsWith('.ts'));

	for (const messageCommandFile of messageCommandFiles) {
		const { default: command }: { default: MessageCommand } = await import(`../commands/message/${messageCommandFile}`);

		messageCommands.set(command.name, command);

		const messageCommandAliases = command.aliases || [];

		for (const messageCommandAlias of messageCommandAliases) {
			messageCommands.set(messageCommandAlias, command);
		}

	}

	client.on('messageCreate', async (message) => {
		const messageCommand = messageCommands.get(message.content.split(' ')[0].replace(config.prefix, ''));
		if (!messageCommand) return;

		if (messageCommand.withPrefix && !message.content.startsWith(config.prefix)) return;
		if (!messageCommand.withPrefix && message.content.startsWith(config.prefix)) return;

		messageCommand.run({ client, message, args: message.content.split(' ').slice(1) });
	})



	const slashCommandFiles = fs
		.readdirSync('./commands/slash')
		.filter((file) => file.endsWith('.ts'));

	for (const slashCommandFile of slashCommandFiles) {
		const { default: command }: { default: SlashCommand } = await import(`../commands/slash/${slashCommandFile}`);

		slashCommands.set(command.build.name, command);
	}
}

export default commands;

