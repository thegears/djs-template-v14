import { REST, Routes, SlashCommandBuilder } from "discord.js";
import fs from "fs";
import config from "../config.json" with { type: "json" };

const commands: SlashCommandBuilder[] = [];

const rest = new REST().setToken(config.token);

(async () => {

	fs.readdirSync("./commands/slash").forEach((file) => {
		if (!file.endsWith(".ts")) return;
		const command = require(`../commands/slash/${file}`).default;
		commands.push(command.build.toJSON());
	});

	try {
		console.log("Started registering Slash (/) commands.");
		console.log(commands.map(c => c.name).join("\n"));

		await rest.put(
			Routes.applicationCommands(config.clientId),
			{ body: commands },
		)

		console.log(`Successfully registered Slash (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
