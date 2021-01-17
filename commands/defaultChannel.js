const roleHandler = require('../handlers/roleHandler');
const guildModel = require('../models/guild');
const logToConsole = require('../events/logToConsole');


module.exports = {
    defaultChannelCMD: async function (message, args) {
        //check if the user is an admin
        if (!roleHandler.checkAdmin(message)) {
            //check to see if a default channel is set for this server yet
            const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
            //if the server has a default channel, send it here
            message.channel.send(`This server's default channel is: <#${req.GUILD_DEFAULT_CHANNEL}>`);

        } else if (roleHandler.checkAdmin(message)) {
            //if the command was sent with an argument, update the guild's default channel, and let the user know

            //check to see if a default channel is set for this server yet
            const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
            //if the server has a default channel, send it here
            message.channel.send(`This server's default channel is: <#${req.GUILD_DEFAULT_CHANNEL}>`);
            if (args[1]) {
                console.log(args[1]);
                const doc = await guildModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { GUILD_DEFAULT_CHANNEL: args[1] } }, { new: true });
                message.channel.send(`Set the default channel to <#${doc.GUILD_DEFAULT_CHANNEL}>`);
                await doc.save();
            }
        }
        logToConsole.command(message.guild, message);

    }
}
