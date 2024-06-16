# djs-template-v14

This is a template project for [Discord.js v14](https://github.com/discordjs/discord.js).

I am recommending using this project with [Bun](https://bun.sh)

To install dependencies:

```bash
bun install
```

To register Slash Commands:

```bash
bun registerSlashCommands
```

To run:

```bash
bun start
```

## Examples

### Example for interactions/button


#### With params
```ts
import type { Interaction } from '../../typings'

/**
    new ButtonBuilder()
	    .setCustomId(`[example]{thegears}`)
	    .setStyle(ButtonStyle.Secondary)
	    .setLabel('Example')
 */


const button: Interaction = {
	customId: 'example',
	withParams: true,
	run: async ({ interaction, params }) => {
		interaction.reply({
			content: `${params[0]}` // thegears
		})
	}
}

export default button;
```

#### Without params
```ts
import type { Interaction } from '../../typings'

/**
    new ButtonBuilder()
	    .setCustomId(`example`)
	    .setStyle(ButtonStyle.Secondary)
	    .setLabel('Example')
 */

const button: Interaction = {
	customId: 'example',
	run: async ({ interaction }) => {
		interaction.reply({
			content: 'hello'
		})
	}
}

export default button;
```

### Example for interactions/modal

```ts
import type { Interaction } from '../../typings'

const button: Interaction = {
	customId: 'example',
	run: async ({ interaction }) => {
		interaction.reply({
			content: 'hello'
		})
	}
}

export default button;
```


### Example for commands/message

```ts
import type { MessageCommand } from "../../typings";

const command: MessageCommand = {
	name: "example",
	withPrefix: true,
	aliases: ["e"],
	description: "An example command",
	run: async ({ message }) => {
		message.reply({
			content: "This is an example command with prefix"
		})
	}
}

export default command;
```

### Example for commands/slash

```ts
import { SlashCommandBuilder } from "discord.js";
import type { SlashCommand } from "../../typings";

const slash: SlashCommand = {
	build: new SlashCommandBuilder().setName('example').setDescription('Example command'),
	run: async ({ interaction }) => {
		interaction.reply({
			content: "This is an example slash command"
		})
	}
}

export default slash;
```


### Example for events

```ts
import type { Event } from "../typings";

const event: Event = {
	name: "ready",
	once: true,
	async run({ client }) {
		console.log(`Logged in as ${client.user?.tag}!`);
	}
}

export default event
```
