const { Command } = require('discord.js-commando');
const onReady = require('../../actions/onReady.js');
//require('colors');

module.exports = class RemoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            group: 'admin',
            memberName: 'remove',
            description: 'Removes information about the server from the database',
            examples: ['remove'],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR']
        });
    }

    run(message) {
        message.channel.send("If you would like to request that all your data be removed from our servers, please DM @nathen418#0002");
        //logToConsole.command(message.guild, message);
    }
};
