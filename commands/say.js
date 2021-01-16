const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    sayCMD: function (message, args) {
        if (roleHandler.checkAdmin(message) || roleHandler.checkBotOwner(message)) {
            message.delete();
            //check if the first argument is a number
            if (isNaN(args[1])) {
                args.shift();
                var msg = args.join(" ");
                //send the message that the user entered
                message.channel.send(msg);
            } else {

                //convert the message into something that can be easily sent by the bot
                var chanID = args[1];
                args.shift();
                args.shift();
                var msg = args.join(" ");
                //send the message that the user entered in the channel the user specified
                bot.channels.cache.get(chanID).send(msg);
            }
            logToConsole.command(message.guild, message);

        } else {
            roleHandler.noPermissionMsg(message, 'say')
        }
    },
    help: function (message) {
        message.channel.send("The _ command is used for: ")
    }
}
