const memberLogModel = require('../models/guild');
require('../handlers/exceptionHandler');

module.exports = {
    event: async function (guild, bot) {
        var memberlog = "";
	    const list = bot.guilds.cache.get(guild.id);
        list.members.cache.forEach(member => memberlog += member.user.id += " ");
        //in the future move this to a seperate file
        const doc = new memberLogModel({
            GUILD_ID: guild.id,
            GUILD_MEMBERS: memberlog
        });
        await doc.save();
        console.log("Wrote members to list");
    }
}