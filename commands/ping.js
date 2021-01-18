//send ping embed
const Discord = require('discord.js');
const logToConsole = require('../events/logToConsole');

module.exports = {
    pingCMD: function (message) {
        message.delete();
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#ff3505')
            .setTitle('Bot/API Ping')
            .setDescription(`Ping: 🏓 | Latency is: **${Date.now() - message.createdTimestamp}**ms.`, );
        message.channel.send(pingEmbed);
        logToConsole.command(message.guild, message);
    }
}
