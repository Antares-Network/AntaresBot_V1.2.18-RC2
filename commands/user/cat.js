const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const channelCheck = require('../../functions/channelCheck')



function embed(message, img, title) {
    const Embed = new MessageEmbed()
        .setColor('#ff3505')
        .setURL('https://discord.gg/6pZ2wtGANP')
        .setTitle(title)
        .setImage(img)
        .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot | ${botVersion}`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
    message.channel.send(Embed);
    //logToConsole.command(message.guild, message);
}

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            aliases: ['kitten', 'meow'],
            group: 'user',
            memberName: 'cat',
            description: 'Sends a random cat image',
            examples: ['cat'],
            guildOnly: true
        });
    }
    async run(message) {
        if (await channelCheck.check(message) == true) {
            //request a cat from the api
            try {
                fetch('http://aws.random.cat/meow')
                    .then(res => res.json())
                    .then(json => embed(message, json.file, 'Random Cat Picture'));
            } catch (e) {
                message.channel.send("Error. Please try again.");
                console.error(e)
            }
            console.log("passed the channel check")
        } else {
            console.log("failed the channel check")
        }

        //send to the console that this command was run
        //logToConsole.command(message.guild, message);
    }
};