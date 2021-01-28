const docCreate = require('../events/docCreate');
const piiCreate = require('../events/piiCreate');
const guildModel = require('../models/guild');
const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');


module.exports = {
    createCMD: async function (message, bot) {
        //check if user wants to create a doccument. This must be outside the switch (args[0]) loop so that it always searches for '&create'
        const srv = await guildModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
        if (srv !== null) {
            message.channel.send("This Server already has a Doccument");
        } else if (roleHandler.checkAdmin(message)) {
            piiCreate.event(message.guild, bot);
            docCreate.event(message.guild, bot);
            message.channel.send('Made new doccument');
        } else {
            roleHandler.noPermissionMsg('&create');
        }
        logToConsole.command(message.guild, message);
    }
}