const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const redditImageFetcher = require('reddit-image-fetcher');
const channelCheck = require('../../functions/channelCheck')


module.exports = class RedditCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reddit',
            aliases: ['meme'],
            group: 'user',
            memberName: 'reddit',
            description: 'Sends a random meme from reddit',
            examples: ['reddit'],
            guildOnly: true
        });
    }
    async run(message) {
        if (await channelCheck.check(message) == true) {
            var post = await redditImageFetcher.fetch({
                type: 'meme',
                total: 1
            });
            const Embed = new MessageEmbed()
                .setColor('#ff3505')
                .setURL('https://discord.gg/6pZ2wtGANP')
                .setTitle(`Random Meme from Reddit`)
                .setImage(post[0].image)
                .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot | ${botVersion}`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
            message.channel.send(Embed);
            //logToConsole.command(message.guild, message);
        }
    }
};