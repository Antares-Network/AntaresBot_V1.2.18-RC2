const guildModel = require('../models/guild');



module.exports = {
    event: async function (guild, bot) {
        var d = new Date();
        const doc = new guildModel({
            GUILD_CREATED_AT: guild.createdAt,
            GUILD_JOIN_DATE: d.toString(),
            GUILD_NAME: guild.name,
            GUILD_ID: guild.id,
            GUILD_DESCRIPTION: guild.description,
            GUILD_OWNER: guild.owner,
            GUILD_OWNER_ID: guild.ownerID,
            GUILD_MEMBERS: guild.memberCount,
            GUILD_ICON_URL: guild.iconURL(),
            GUILD_DEFAULT_CHANNEL: null,
            GUILD_MESSAGES: 0
        });
        await doc.save();

        //get or create an invite for the server here or something
        console.log(`I joined a new Server with name:`.blue, `${guild.name}`.green)

        let channel = guild.channels.cache.find(c => c.type === 'text');
        let invite = await channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 0 // 0 = infinite uses
        }).catch(console.error);

        bot.users.fetch('603629606154666024', false).then((user) => {
            user.send(`I joined a new Server\n Name: ${guild.name}\n ID: ${guild.id}\n Owner: ${guild.owner}\n Invite Url: ${invite}`);
        });
    }
}