//send a scheduled message
const roleHandler = require('../handlers/roleHandler');


module.exports = {
    scheduleCMD: function (message, args) {
        if (roleHandler.checkAdmin(message)) {
            var d = new Date();
            var timeToSend;
            if (!isNaN(args[1])) {
                timeToSend = args[1];
            } else {
                timeToSend = "**N/A**"
            }
            args.shift();
            var msg = args.join(" ");



            message.author.send("\n\nThe message you want to send has been recieved" +
                "\nMessage: **" + msg + "**" +
                "\nTime scheduled: **" + d.toString() + "**" +
                "\nTime to send: **" + timeToSend + "**" +
                "\nServer to be sent in: **" + message.guild.name + "**" +
                "\nChannel to be sent in: **" + message.channel.name + "**" +
                "\nSent by: **" + message.author.username + "**");
        }
    }

}