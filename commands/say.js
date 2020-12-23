const roleHandler = require('../handlers/roleHandler');
module.exports = {
    sayCMD: function (PREFIX, message, args) {
        console.log(PREFIX + "say command called");
        if (roleHandler.checkAdmin(message)) {
            //check if the first argument is a number
            if (isNaN(args[1])) {
                args.shift();
                var msg = args.join(" ");
                message.channel.send(msg);
                console.log("The user, " + message.author.username + " ran " + PREFIX + "say with the message: " + msg);
            } else {

                //convert the message into something that can be easily sent by the bot
                var chanID = args[1];
                args.shift();
                args.shift();
                var msg = args.join(" ");
                bot.channels.cache.get(chanID).send(msg);
                console.log("The user, " + message.author.username + " ran " + PREFIX + "say with the message: " + msg);
            }
        } else {
            roleHandler.noPermissionMsg(message, 'say')
        }
    }
}
