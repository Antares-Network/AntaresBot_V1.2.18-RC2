const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');
const onReady = require('../events/onReady');

module.exports = {
    restartCMD: async function (message, bot) {
        if (roleHandler.checkBotOwner(message)) {

            message.channel.send('Restarting...');
            console.log('\n\n\n\n\n\n\n\n')
            bot.destroy();
            console.log("Signed out of the Discord API");
            bot.login(process.env.BOT_TOKEN).catch(e => console.error(e));
            console.log('Trying to login to the Discord API\nPlease wait for a connection'.yellow);
            onReady.event(bot);
            console.log("Logged into the Discord API".green);
            console.log("Startup script has run".red);
        } else {
            roleHandler.noPermissionMsg(message, "restart")
        }
        logToConsole.command(message.guild, message);
    }
}