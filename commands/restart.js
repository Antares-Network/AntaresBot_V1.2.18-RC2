const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');
const onReady = require('../events/onReady');

module.exports = {
    restartCMD: async function (message, bot) {
        if (roleHandler.checkAdmin(message)) {

            message.channel.send('Restarting...');
            console.log('\n\n\n\n\n\n\n\n\n\n\n\n')
            bot.destroy();
            console.log("Signed out of the Discord API")
            bot.login(process.env.BOT_TOKEN);
            console.log("Logged into the Discord API")
            onReady.event(bot)
            console.log("Startup script has run")
        } else {
            roleHandler.noPermissionMsg(message, "restart")
        }
        logToConsole.command(message.guild, message);
    }
}