const { Command } = require('discord.js-commando');
const channelCheck = require('../../functions/channelCheck')

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'user',
            memberName: 'invite',
            description: 'Sends an invite for the bot and the support server.',
            examples: ['invite'],
            guildOnly: true
        });
    }

    async run(message) {
        if (await channelCheck.check(message) == true) {
            message.channel.send("https://discord.com/oauth2/authorize?client_id=736086156759924762&scope=bot&permissions=8");
            message.author.send("Thank you for inviting me to your server, " +
                "\n If you would like to join our support/comunity server, click the link below:" +
                "\n https://discord.gg/6pZ2wtGANP");
            //message.channel.send("https://discord.gg//6pZ2wtGANP")
            //logToConsole.command(message.guild, message);
        }
    }
};