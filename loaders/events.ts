import fs from 'fs';
import type { LoaderFunction } from '../typings';

const events: LoaderFunction = async function({ client }) {

	const eventFiles = fs
		.readdirSync('./events')
		.filter((file) => file.endsWith('.ts'));

	for (const eventFile of eventFiles) {
		const { default: event } = await import(`../events/${eventFile}`);

		client[event.once ? 'once' : 'on'](event.name, (...args) => event.run({ client, ...args }));

	}
};

export default events;


