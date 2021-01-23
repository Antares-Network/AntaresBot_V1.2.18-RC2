const piiModel = require('../models/pii');


module.exports = {
    event: async function (guild, bot) {

        var channelList = [];
        var memberList = [];
        var roleList = [];

        //get the current Guild ID
        const guildOb = bot.guilds.cache.get(guild.id);
        //get list of members
        guildOb.members.cache.forEach(member => memberList.push(member.user.id));
        //get list of channels
        guildOb.channels.cache.forEach(channel => channelList.push(channel.name));
        //get list of roles
        guildOb.roles.cache.forEach(role => roleList.push(role.name));

        const srv = await piiModel.findOne({ GUILD_ID: guildOb.id }); //find the entry for the guild
        if (srv === null) {
            //create new doc and send all the above information to it

            const doc = new piiModel({
                GUILD_ID: guild.id,
                GUILD_NAME: guild.name,
                GUILD_MEMBERS: memberList,
                GUILD_CHANNELS: channelList,
                GUILD_ROLES: roleList,
                GUILD_COMMAND_COUNT: 0,
                GUILD_ADMIN_CHANNEL: null,
                GUILD_COUNTING_NUMBER: 0
            });

            await doc.save();
        }
    }
}