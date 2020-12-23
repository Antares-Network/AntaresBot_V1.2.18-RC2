const guildModel = require('../models/guild');
require('../handlers/exceptionHandler');

module.exports = {
    event: async function (guild) {
        //in the future move this to a seperate file
        const doc = new guildModel({
            GUILD_CREATED_AT: guild.createdAt,
            GUILD_NAME: guild.name,
            GUILD_ID: guild.id,
            GUILD_DESCRIPTION: guild.description,
            GUILD_OWNER: guild.owner,
            GUILD_OWNER_ID: guild.ownerID,
            GUILD_MEMBERS: guild.memberCount,
            GUILD_ICON_URL: guild.iconURL(),
            prefix: '&'
        });
        await doc.save();
        console.log("I joined a new Server with name: " + guild.name)
    }
}