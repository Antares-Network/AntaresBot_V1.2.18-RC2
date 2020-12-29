const logToConsole = require('../events/logToConsole');

module.exports = {
    privacyCMD: function (message) {
        message.author.send("**Data Collected By Command and when features are enabled**\n" +
            "The following may be collected when the bot joins a server and or when a user voluntarily enters this information. " +
            "When providing data in this way, you forego any rights to the content of the data provided." +
            "Server configurations (region, name, id, description, age, icon, channel names and channel ids)\n" +
            "Server ownership\n" +
            "List of server's members\n" +
            "List of server's roles\n\n" +

            "All data is stored on secured servers. Maximum efforts are taken to keep collected data protected, but absolute security cannot be guaranteed. We are not liable for any damages or stolen information, in which we collect, from our servers.\n\n" +

            "**Server Member Agreement**\n" +
            "By being a member of a server which uses Antares Bot's services or features, you are consenting to the policies outlined in this agreement. If you, the server member, do not agree with any policies outlined in this agreement, you have the right to leave the server in which this bot is a part of.\n\n" +

            "**Server Administrator Agreement**\n" +
            "By adding Antares Bot to your server, you are consenting to the policies outlined in this agreement. If you, the server administrator, do not agree with any of the policies outlined in this agreement, you have the right to remove Antares Bot from your server.\n\n" +

            "**To request the data we store on you to be deleted from our database, please run the command &remove**\n\n" +
            "However the following data will remain: **Server Name, ID, Owner, and previous bot join date**")
        logToConsole.log(message.guild, "privacy");

    },
    help: function (message) {
        message.channel.send("The _ command is used for: ")
    }
}