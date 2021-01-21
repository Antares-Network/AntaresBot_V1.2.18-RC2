const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    dmCMD: function (message, bot, args) {
        message.delete();
        //check if user has the adminRole
        if (roleHandler.checkAdmin(message) || roleHandler.checkBotOwner(message)) {
            if (isNaN(args[1])) {
                const member = message.mentions.members.first().id;
                args.shift();
                args.shift();
                var msg = args.join(" ");
                bot.users.cache.get(member).send(msg);
                logToConsole.command(message.guild, message);
            } else {
                //convert the message into something that can be easily sent by the bot
                var userID = args[1];
                args.shift();
                args.shift();
                var msg = args.join(" ");
                bot.users.cache.get(userID).send(msg);
                logToConsole.command(message.guild, message);
            }
        } else {
            roleHandler.noPermissionMsg(message, 'dm');
        }
    }
}
