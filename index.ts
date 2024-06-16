import { Client, GatewayIntentBits } from "discord.js";
import eventsLoader from "./loaders/events";
import interactionsLoader from "./loaders/interactions";
import commandsLoader from "./loaders/commands";
import config from './config.json' with { type: 'json' };

const client = new Client({
	intents: <GatewayIntentBits[]>Object.values(GatewayIntentBits)
});

eventsLoader({
	client
});

interactionsLoader({
	client
});

commandsLoader({
	client
});

client.login(config.token);
