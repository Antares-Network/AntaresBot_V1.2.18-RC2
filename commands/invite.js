//send the invite link for the bot
const logToConsole = require('../events/logToConsole');

module.exports = {
    inviteCMD: function (message) {
        message.channel.send("https://discord.com/oauth2/authorize?client_id=736086156759924762&scope=bot&permissions=8");
        message.channel.send("https://discord.gg//6pZ2wtGANP")
        logToConsole.command(message.guild, message);

    },
    help: function (message) {
        message.channel.send("The _ command is used for: ")
    }
}