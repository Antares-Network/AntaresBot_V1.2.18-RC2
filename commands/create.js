const docCreate = require('../events/docCreate');
const piiUpdate = require('../events/piiUpdate');
const guildModel = require('../models/guild');
const roleHandler = require('../handlers/roleHandler');


module.exports = {
    createCMD: async function (message, bot) {
        //check if user wants to create a doccument. This must be outside the switch (args[0]) loop so that it always searches for '&create'
        if (message.content === '&create') {
            const srv = await guildModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
            if (srv.GUILD_ID !== null) {
                message.channel.send("This Server already has a Doccument");
            } else if (roleHandler.checkAdmin(message)) {
                piiUpdate.event(message.guild, bot);
                docCreate.event(message.guild);

                message.channel.send('Made new doccument');
            } else {
                roleHandler.noPermissionMsg('&create');
            }
        }
    }
}