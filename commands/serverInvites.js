const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    listInvites: function (bot, message, args) {
        if (roleHandler.checkBotOwner(message)) {
            message.delete();
            //grab channels in the guild and create an invite for that guild if one does not already exist.  then send the invite
            //to the bot.owner (nathen418#0002)
            //for debug only and to aid in making sure the bot works fully
            //this code is complient with the bot's privacy policy. Read it at &privacy.


            //if the user provides a guild id, get an invite from that server
            //else if the user provides the string 'all' get an invite for all the servers
            //else remind the user that the command needs an argument
            if (args[1] == null){
                message.author.send("You did not provide a server id or the string `ALL` to get invites to all of the servers the bot is in, or the string 'this' to get a link to the server you are currently in.");
            } else if (!isNaN(args[1])) {
                let guild = bot.guilds.cache.get(args[1]);
                let channel = guild.channels.cache.find(c => c.type === 'text');
                createLink(channel, message, guild);

            } else if (args[1].toUpperCase() === 'ALL') {
                
                bot.guilds.cache.forEach(guild => {
                    let channel = guild.channels.cache.last();
                    createLink(channel, message, guild);
                });
            } else if (args[1].toUpperCase() === 'THIS') {
                let channel = message.channel;
                createLink(channel, message);
            }
            async function createLink(chan, message, guild) {
                let invite = await chan.createInvite({
                    maxAge: 0, // 0 = infinite expiration
                    maxUses: 0 // 0 = infinite uses
                }).catch(console.error);
                try {
                    message.author.send(`Guild Name: ${guild.name}\nInvite link: ${invite}`)

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