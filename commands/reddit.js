const redditImageFetcher = require('reddit-image-fetcher');
const embedHandler = require('../handlers/embedHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    redditCMD: async function (message, arg) {

        if (arg === "MinecraftMemes" || arg === "minecraft" || arg === "DankMemes") {
            var post = await redditImageFetcher.fetch({
                type: 'custom',
                total: 1, 
                subreddit: [arg]
            });
            embedHandler.regularEmbed(message, post[0].image, `Random Image from the ${arg} Subreddit` )
        } else {
            message.channel.send("You did not enter an approved Subreddit.");
        }
        logToConsole.log(message.guild, "reddit " + arg);

    }
}