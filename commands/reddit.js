const redditImageFetcher = require('reddit-image-fetcher');
const embedHandler = require('../handlers/embedHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    redditCMD: async function (message) {

        var post = await redditImageFetcher.fetch({
            type: 'meme',
            total: 1
        });
        embedHandler.regularEmbed(message, post[0].image, `Random Meme from Reddit`)
        logToConsole.command(message.guild, message);

    },
    help: function (message) {
        message.channel.send("**reddit**: Sends a random meme from Reddit.")    }
}