import fs from 'fs';
import type { Interaction, LoaderFunction } from '../typings';
import { slashCommands } from './commands';

const interactions: LoaderFunction = async function({ client }) {

	const buttons = new Map<string, Interaction>();

	const buttonFiles = fs
		.readdirSync('./interactions/button')
		.filter((file) => file.endsWith('.ts'));

	for (const buttonFile of buttonFiles) {
		const { default: button }: { default: Interaction } = await import(`../interactions/button/${buttonFile}`);

		buttons.set(button.customId, button);
	}

	const modals = new Map<string, Interaction>();

	const modalFiles = fs
		.readdirSync('./interactions/modal')
		.filter((file) => file.endsWith('.ts'));

	for (const modalFile of modalFiles) {
		const { default: modal }: { default: Interaction } = await import(`../interactions/button/${modalFile}`);

		modals.set(modal.customId, modal);
	}

	client.on("interactionCreate", async interaction => {
		if (interaction.isButton()) {
			let button = buttons.get(interaction.customId);
			if (button) button.run({ client, interaction, params: [] });
			else {
				const id = interaction.customId.match(/\[(.+?)\]/g)?.map(a => a.split("[")[1].split("]")[0])[0]
				if (!id) return;
				button = buttons.get(id);
				if (!button) return;
				const params = interaction.customId.match(/\{(.+?)\}/g)?.map(a => a.split("{")[1].split("}")[0]) || []
				button.run({ client, interaction, params });
			}
		} else if (interaction.isModalSubmit()) {
			let modal = modals.get(interaction.customId);
			if (modal) modal.run({ client, interaction, params: [] });
			else {
				const id = interaction.customId.match(/\[(.+?)\]/g)?.map(a => a.split("[")[1].split("]")[0])[0]
				if (!id) return;
				modal = modals.get(id);
				if (!modal) return;
				const params = interaction.customId.match(/\{(.+?)\}/g)?.map(a => a.split("{")[1].split("}")[0]) || []
				modal.run({ client, interaction, params });
			}
		} else if (interaction.isChatInputCommand()) {
			const command = slashCommands.get(interaction.commandName);
			if (!command) return;
			command.run({ client, interaction });
		}
	})
};

export default interactions;


