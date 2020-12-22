const roleHandler = require('../handlers/roleHandler.js');
module.exports = {
    dmCMD: function (PREFIX, message, bot, args, adminRole) {
        message.delete();
        console.log(PREFIX + "dm command called");
        //check if user has the adminRole
        if (roleHandler.checkAdmin(message, adminRole)) {
            if (isNaN(args[1])) {
                const member = message.mentions.members.first().id;
                console.log(member);
                args.shift();
                args.shift();
                var msg = args.join(" ");
                bot.users.cache.get(member).send(msg);
                console.log("The user, " + message.author.username + " ran " + PREFIX + "dm with the message: " + msg + " to " + member.username);
            } else {

                //convert the message into something that can be easily sent by the bot
                var userID = args[1];
                args.shift();
                args.shift();
                var msg = args.join(" ");
                bot.users.cache.get(userID).send(msg);
                console.log("The user, " + message.author.username + " ran " + PREFIX + "dm with the message: " + msg + " to " + member.username);
            }
        } else {
            roleHandler.noPermissionMsg(message, 'dm');
        }
    }
}
