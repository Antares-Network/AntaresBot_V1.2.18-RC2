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

module.exports = class XkcdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            aliases: ['comic', 'cartoon'],
            group: 'user',
            memberName: 'xkcd',
            description: 'Sends a random XKCD comic',
            examples: ['xkcd'],
            guildOnly: true
        });
    }
    async run(message) {
        if (await channelCheck.check(message) == true) {
            let comicNum = Math.floor(Math.random() * 2413);
            try {
                var url = `http://xkcd.com/${comicNum}/info.0.json`;
                //request a comic from the url
                fetch(url)
                    .then(res => res.json())
                    .then(json => embed(message, json.img, `Random Comic from XKCD`));
            } catch (e) {
                message.channel.send("Error. Please try again.");
                console.error(e)
            }
            //send to the console that this command was run
            //logToConsole.command(message.guild, message);
        }
    }
};