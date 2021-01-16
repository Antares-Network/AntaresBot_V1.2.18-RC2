const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {


    listInvites: function (bot, message) {
        if (roleHandler.checkBotOwner(message)) {
            //grab channels in the guild and create an invite for that guild if one does not already exist.  then send the invite
            //to the bot.owner (nathen418#0002)
            //for debug only and to aid in making sure the bot works fully
            //this code is complient with the bot's privacy policy. Read it at &privacy.
            bot.guilds.cache.forEach(guild => {
                let channel = guild.channels.cache.last();
                createLink(channel, guild, message);
            });
            async function createLink(chan, guild, message) {
                //let invite = await chan.createInvite().catch(console.error);
                let invite = await chan.createInvite({
                    maxAge: 0, // 0 = infinite expiration
                    maxUses: 0 // 0 = infinite uses
                  }).catch(console.error);
                try {
                    message.author.send(`Guild Name: ${guild.name}\nInvite link: ${invite}`)
                    
                } catch (e) {
                    console.log(guild.name + '|' + 'no link available');
                }
            }
            logToConsole.command(message.guild, message);
        } else {
            roleHandler.noPermissionMsg(message, 'singleInvite')
        }
    }
}