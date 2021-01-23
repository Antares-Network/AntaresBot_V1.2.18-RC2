const roleHandler = require('../handlers/roleHandler');
const piiModel = require('../models/pii');
const logToConsole = require('../events/logToConsole');

module.exports = {
    adminChannelCMD: async function (message, args) {
        //check if the user is an admin
        if (!roleHandler.checkAdmin(message)) {
            //check to see if a admin channel is set for this server yet
            const req = await piiModel.findOne({ GUILD_ID: message.guild.id });
            //if the server has a admin channel, send it here
            message.channel.send(`This server's admin channel is: <#${req.GUILD_ADMIN_CHANNEL}>`);

        } else if (roleHandler.checkAdmin(message)) {
            //check to see if a admin channel is set for this server yet
            const req = await piiModel.findOne({ GUILD_ID: message.guild.id });
            //if the server has a admin channel, send it here
            message.channel.send(`This server's admin channel is: <#${req.GUILD_ADMIN_CHANNEL}>`);
            if (!isNaN(args[1])) {
                console.log(args[1]);
                const doc = await piiModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { GUILD_ADMIN_CHANNEL: args[1] } }, { new: true });
                message.channel.send(`Set the admin channel to <#${doc.GUILD_ADMIN_CHANNEL}>`);
                await doc.save();
            }
        }
        logToConsole.command(message.guild, message);

    }
}
