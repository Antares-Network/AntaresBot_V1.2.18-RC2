const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    singleInviteCMD: function (bot, message) {
        if (roleHandler.checkBotOwner(message)) {
            message.delete();
            //grab channels in the guild and create an invite for that guild if one does not already exist.  then send the invite
            //to the bot.owner (nathen418#0002)
            //for debug only and to aid in making sure the bot works fully
            //this code is complient with the bot's privacy policy. Read it at &privacy.
            let channel = message.channel;

            createLink(channel, message);
            async function createLink(chan, message) {
                let invite = await chan.createInvite({
                    maxAge: 0, // 0 = infinite expiration
                    maxUses: 0 // 0 = infinite uses
                }).catch(console.error);
                try {
                    message.author.send(`Guild Name: ${message.guild.name}\nInvite link: ${invite}`)

                } catch (e) {
                    console.log(message.guild.name + '|' + 'no link available');
                }
            }
            logToConsole.command(message.guild, message);
        } else {
            roleHandler.noPermissionMsg(message, 'singleInvite')
        }
    }
}
