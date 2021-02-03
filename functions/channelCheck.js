const guildModel = require('../models/guild');

module.exports = {
    check: async function (message) {
        let messageAuth = message.author;
        const srv = await guildModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
        if (message.channel.id != srv.GUILD_DEFAULT_CHANNEL) {
            if (srv.GUILD_DEFAULT_CHANNEL === null) {
                message.channel.send("The server owner has not set a default channel yet.\n If you are the server owner please use `&adefaultchannel (CHANNEL ID)`");
                return false; //exit the loop and don't parce the command
            } else {
                console.log("ping in default channel and return FALSE")
                //ping the user in the default channel
                bot.channels.cache.get(srv.GUILD_DEFAULT_CHANNEL).send(`<@${messageAuth.id}> Please use me in this channel`)
                return false;
            }
        } else {
            console.log("The message was sent in the default channel")
            return true;
        }
    }
}