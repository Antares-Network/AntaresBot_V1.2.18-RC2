const { Command } = require('discord.js-commando');
const { message } = require('../../actions/logToConsole.js');
const onReady = require('../../actions/onReady.js');
//require('colors');

module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            group: 'admin',
            memberName: 'restart',
            description: 'Restarts the bot',
            examples: ['restart'],
            guildOnly: true
        });
    }

    hasPermission(msg) {
        msg.channel.send("Only the bot owner can use this command.")
        return this.client.isOwner(msg.author);
    }
    run(message) {
        message.channel.send('Restarting...');
        console.log('\n\n\n\n\n\n\n\n')
        bot.destroy();
        console.log("Signed out of the Discord API".red.bold);
        bot.login(process.env.BOT_TOKEN).catch(e => console.error(e));
        console.log('Trying to login to the Discord API\nPlease wait for a connection'.yellow);
        onReady.event(bot);
        console.log("Logged into the Discord API".green.bold);
        console.log("Startup script has run".red.bold);
    }
};