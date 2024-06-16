import fs from 'fs';
import type { LoaderFunction, MessageCommand, SlashCommand } from '../typings';
import config from '../config.json' with { type: 'json' };

export const slashCommands = new Map<string, SlashCommand>();

export const messageCommands = new Map<string, MessageCommand>();

const messageAliases = new Map<string, string>();

const commands: LoaderFunction = async function({ client }) {


	const messageCommandFiles = fs
		.readdirSync('./commands/message')
		.filter((file) => file.endsWith('.ts'));

	for (const messageCommandFile of messageCommandFiles) {
		const { default: command }: { default: MessageCommand } = await import(`../commands/message/${messageCommandFile}`);


		messageCommands.set(command.name, command);

		const messageCommandAliases = command.aliases || [];

		for (const messageCommandAlias of messageCommandAliases) {
			messageAliases.set(messageCommandAlias, command.name);
		}

	}


	client.on('messageCreate', async (message) => {
		let messageCommand = messageCommands.get(message.content.split(' ')[0].replace(config.prefix, ''));
		if (!messageCommand) {
			const messageCommandAlias = messageAliases.get(message.content.split(' ')[0].replace(config.prefix, ''));
			if (messageCommandAlias) messageCommand = messageCommands.get(messageCommandAlias);
		}
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

