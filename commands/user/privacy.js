const { Command } = require('discord.js-commando');
const channelCheck = require('../../functions/channelCheck')

module.exports = class PrivacyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'privacy',
            group: 'user',
            memberName: 'privacy',
            description: 'Sends in a dm, the privacy policy for the bot.',
            examples: ['privacy'],
            guildOnly: true
        });
    }

    async run(message) {
        if (await channelCheck.check(message) == true) {
            message.author.send("**Data Collected By Command and when features are enabled**\n" +
                "The following may be collected when the bot joins a server and or when a user voluntarily enters this information. " +
                "When providing data in this way, you forego any rights to the content of the data provided.\n" +
                "Server configurations (region, name, id, description, age, icon, channel names and channel ids)\n" +
                "Server ownership\n" +
                "List of server's members\n" +
                "List of server's roles\n" +
                "Messages sent (these are **not** stored but the bot sees them) *messages sent in the bot support server* **are** *stored*\n" +
                "Commands sent (These **are** stored)\n" +
                "Server invites (The bot may create an invite for your server)\n" +
                "Number of commands and messages sent\n\n" +


                "**All data is stored on secured servers. Maximum efforts are taken to keep collected data protected, but absolute security cannot be guaranteed. We are not liable for any damages or stolen information, in which we collect, from our servers.**\n\n" +

                "**Server Member Agreement**\n" +
                "By being a member of a server which uses Antares Bot's services or features, you are consenting to the policies outlined in this agreement. If you, the server member, do not agree with any policies outlined in this agreement, you have the right to leave the server in which this bot is a part of.\n\n" +

                "**Server Administrator Agreement**\n" +
                "By adding Antares Bot to your server, you are consenting to the policies outlined in this agreement. If you, the server administrator, do not agree with any of the policies outlined in this agreement, you have the right to remove Antares Bot from your server.\n" +
                "This policy may change at any time without warning. It is your responsibility as a server owner to keep up with the changes.\n\n" +

                "**To request the data we store on you to be deleted from our database, please run the command &remove**\n\n" +
                "However the following data will remain: **Server Name, ID, Owner, and previous bot join date**")
            //logToConsole.command(message.guild, message);
        }
    }
};