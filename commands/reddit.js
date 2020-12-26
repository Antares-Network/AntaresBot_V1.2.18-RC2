const redditImageFetcher = require('reddit-image-fetcher');
const embedHandler = require('../handlers/embedHandler');
const logToConsole = require('../logToConsole');

module.exports = {
    redditCMD: async function (message, arg) {
        var post = await redditImageFetcher.fetch({
            type: 'custom',
            total: 1, 
            subreddit: [arg]
        });
        embedHandler.regularEmbed(message, post[0].image, "Random Image from the" + arg + " Subreddit" )
        logToConsole.log(message.guild, "meme");

    }
}