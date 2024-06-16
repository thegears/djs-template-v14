import type { ButtonInteraction, Channel, Client, Events, Guild, GuildMember, Interaction as DiscordInteraction, Message, ModalSubmitInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

type LoaderFunctionParams = {
	client: Client
}

export type LoaderFunction = (params: LoaderFunctionParams) => Promise<void>


type EventFunctionParams = {
	client: Client,
	message?: Message,
	channel?: Channel,
	member?: GuildMember,
	guild?: Guild,
	interaction?: DiscordInteraction
}


type EventFunction = (params: EventFunctionParams) => Promise<void>

/**
 * You must give it a name and a run function and you can optionally give it a once flag to make it only run once.
 * @param name The name of the event 
 * @param once If the event should only run once
 * @param run The function that runs when the event is triggered
 */
export type Event = {
	name: `${Events}`,
	once?: boolean,
	run: EventFunction
}


type IntreactionFunctionParams = {
	client: Client,
	interaction: ButtonInteraction | ModalSubmitInteraction,
	params: string[]
}

type InteractionFunction = (params: IntreactionFunctionParams) => Promise<void>


/**
 * You must give it a customId and a run function and you can optionally give it a withParams flag.
 * @param customId The customId of the Interaction
 * @param withParams If customId has parameters. If you want to use it, you must set customId of Interaction like "[example]{param1}{param2}"
 * @example 
 * When customId is "[example]{param1}{param2}" and withParams is true then params will be ["param1","param2"]
 * ```
 * // example button
 * new ButtonBuilder()
 * .setCustomId('[example]{param1}{param2}')
 *
 *
 * // interactions/button/example.ts
 * {
 *  'customId': 'example',
 *  'withParams': true,
 *	 run: async ({ client, interaction, params }) => {
 *    console.log(params) // ["param1","param2"]
 *   }
 * }
 * ```
 * @param run The function that runs when the Interaction is triggered
 */
export type Interaction = {
	customId: string,
	withParams?: boolean,
	run: InteractionFunction
}


type MessageCommandFunctionParams = {
	client: Client,
	message: Message,
	args: string[]
}

type MessageCommandFunction = (params: MessageCommandFunctionParams) => Promise<void>

/**
 * You must give it a name, withPrefix flag, description and a run function and you can optionally give it a aliases to use it with these aliases.
 * @param name The name of the command 
 * @param description The description of the command
 * @param aliases The aliases of the command
 * @param withPrefix If the command should have a prefix
 * @param run The function that runs when the command is triggered
 */
export type MessageCommand = {
	name: string,
	withPrefix: boolean,
	aliases?: string[],
	description: string,
	run: MessageCommandFunction
}

type SlashCommandFunctionParams = {
	client: Client,
	interaction: ChatInputCommandInteraction
}

type SlashCommandFunction = (params: SlashCommandFunctionParams) => Promise<void>

/**
 * You must give it a build and a run function
 * @param build The build of the command which is a created with SlashCommandBuilder
 * @param run The function that runs when the command is triggered
 */
export type SlashCommand = {
	build: SlashCommandBuilder,
	run: SlashCommandFunction
}
