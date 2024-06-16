import type { Event } from "../typings";

const event: Event = {
	name: "ready",
	once: true,
	async run({ client }) {
		console.log(`Logged in as ${client.user?.tag}!`);
	}
}

export default event
