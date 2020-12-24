const roleHandler = require('../handlers/roleHandler');
const guildModel = require('../models/guild');

module.exports = {
    prefixCMD: async function (message, args) {
        //check if the user is an admin
        if (!roleHandler.checkAdmin(message)) {
            //check to see if a prefix has already been set up for this guild and grab it if it exists already
            const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
            //if the guild has a prefix, send it here
            message.channel.send(`This server's prefix is: **${req.prefix}**`);

        } else if (roleHandler.checkAdmin(message)) {
            //if the command was sent with an argument, update the guild's prefix, and let the user know

            //check to see if a prefix has already been set up for this guild and grab it if it exists already
            const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
            //if the guild has a prefix, send it here
            message.channel.send(`This server's prefix is: **${req.prefix}**`);
            if (args[1]) {
                const doc = await guildModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { prefix: args[1] } }, { new: true });
                message.channel.send(`Set the prefix to ${doc.prefix}`);
                await doc.save();
            }
        }
    }
}