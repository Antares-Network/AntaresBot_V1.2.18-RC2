//send ping embed
const Discord = require('discord.js');
const logToConsole = require('../events/logToConsole');

module.exports = {
    githubCMD: function (message) {
        message.delete();
        const githubEmbed = new Discord.MessageEmbed()
            .setColor('#ff3505')
            .setURL('https://discord.gg//6pZ2wtGANP')
            .setThumbnail('https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png')
            .setTitle('Github')
            .addField('Click here to go to the Antares Bot Github repo: \n https://github.com/Antares-Network/AntaresBot')
            .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png')
        message.channel.send(githubEmbed);
        logToConsole.command(message.guild, message);
    }
}
