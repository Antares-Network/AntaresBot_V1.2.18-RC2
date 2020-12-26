const piiModel = require('../models/pii');
const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../logToConsole');

require('../handlers/exceptionHandler');


module.exports = {
    event: async function (guild, message, bot) {

        if (roleHandler.checkAdmin(message)) {
            var channelList = [];
            var memberList = [];
            var roleList = [];

            //get the current Guild ID
            const guildID = bot.guilds.cache.get(guild.id);
            //get list of members
            guildID.members.cache.forEach(member => memberList.push(member.user.id));
            //get list of channels
            guildID.channels.cache.forEach(channel => channelList.push(channel.name));
            //get list of roles
            guildID.roles.cache.forEach(role => roleList.push(role.name));



            const srv = await piiModel.findOne({ GUILD_ID: guildID }); //find the entry for the guild
            if (srv === null) {
                //create new doc and send all the above information to it

                const doc = new piiModel({
                    GUILD_ID: guild.id,
                    GUILD_MEMBERS: memberList,
                    GUILD_CHANNELS: channelList,
                    GUILD_ROLES: roleList
                });

                await doc.save();
            } else {
                roleHandler.noPermissionMsg(message, "piiUpdate")
            }
            logToConsole.log(message.guild, "piiUpdate");
        }
        //wait for confirmation that the doccument saved before proceding
        console.log("Created PII doc");

    }
}