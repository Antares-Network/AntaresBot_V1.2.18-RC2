const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const channelCheck = require('../../functions/channelCheck')

module.exports = class IpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ip',
            aliases: ['minecraft', 'mc'],
            group: 'user',
            memberName: 'ip',
            description: 'Sends in a dm, the Minecraft server run by the bot Developer.',
            examples: ['ip'],
            guildOnly: true
        });
    }

    async run(message) {
        message.delete();
        if (await channelCheck.check(message) == true) {

            //create new embed
            const ipEmbed = new MessageEmbed()
                .setColor('#ff3505')
                .setTitle('Antares Minecraft Server')
                .addFields(
                    //enter text into embed
                    { name: 'Server Description:', value: 'The Antares Network Minecraft server has a few gamemodes for you to play on.', inline: true },
                    { name: 'Game Modes:', value: 'Factions, Syblock, Prisons, Vanilla, and Creative Plots', inline: true },
                    { name: 'Server IP:', value: 'mc.playantares.com', inline: false },
                    { name: 'Website:', value: 'https://playantares.com', inline: false }
                )
                .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms. | Antares Network`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
            //send message in private message
            message.author.send(ipEmbed);
            //logToConsole.command(message.guild, message);
            console.log(`DM`.blue, `[${message.author.username}]`.yellow, `--`.grey, `--Minecraft IP embed--`.cyan);
        }
    }
};