//send ping embed
const Discord = require('discord.js');
const logToConsole = require('../events/logToConsole');

module.exports = {
    pingCMD: function (PREFIX, message) {
        message.delete();
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#ff3505')
            .setTitle('Bot/API Ping')
            .addField('Ping:', `🏓 | Latency is: **${Date.now() - message.createdTimestamp}**ms.`);
        message.channel.send(pingEmbed);
        logToConsole.log(message.guild, "ping");
    }
}
