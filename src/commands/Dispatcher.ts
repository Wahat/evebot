import {Client, DMChannel, Message, TextChannel, User} from "discord.js"
import {CommandParser} from "./Parser"
import {GlobalContext} from "../GlobalContext"
import {GuildContext} from "../guild/Context"
import {CommandRegistry} from "./Registry"

export namespace CommandDispatcher {
    export function register(client: Client) {
        client.on('message', (message) => {
            if (message.author.bot) {
                return
            }
            if (message.channel instanceof TextChannel) {
                handleTextChannelMessage(message)
            } else if (message.channel instanceof DMChannel) {
                handleDMChannelMessage(message)
            }
        })
    }

    // Assumes that the command does not include the prefix
    export function handleExplicitCommand(context: GuildContext, user: User, message: string) {
        const prefix = '?'
        handleGuildCommand(context, `${prefix}${message}`, user)
    }
}

function handleGuildCommand(context: GuildContext, commandString: string, source: User, message?: Message) {
    const keyword = CommandParser.parseKeyword(context, commandString)
    if (!keyword) {
        return
    }
    const command = CommandRegistry.getCommand(keyword)
    if (!command) {
        console.log(`CommandDispatcher: no command found for ${keyword}`)
        return
    }
    const result = CommandParser.parseArguments(context, command, keyword, commandString)
    if (result.error) {
        console.log(`Could not parse arguments for ${commandString}`)
        return
    }
    if (result.help) {
        // TODO: send help command instead of executing
    }
    command.run(context, source, result.args, message)
}

function handleTextChannelMessage(message: Message) {
    const context = GlobalContext.get(message.guild.id)
    context.setTextChannel(message.channel as TextChannel)
    handleGuildCommand(context, message.content, message.author, message)
}

function handleDMChannelMessage(message: Message) {

}