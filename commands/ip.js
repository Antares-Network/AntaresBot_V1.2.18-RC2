//send Antares Server IP embed in dm to user
const Discord = require('discord.js');
const logToConsole = require('../events/logToConsole');

module.exports = {
    ipCMD: function (message) {
        message.delete();
        //create new embed
        const ipEmbed = new Discord.MessageEmbed()
            .setColor('#ff3505')
            .setTitle('Antares Minecraft Server')
            .addFields(
                //enter text into embed
                { name: 'Server Description:', value: 'The Antares Network Minecraft server has a few gamemodes for you to play on.', inline: true },
                { name: 'Game Modes:', value: 'Factions, Syblock, Prisons, Vanilla, and Creative Plots', inline: true },
                { name: 'Server IP:', value: 'mc.playantares.com', inline: false },
                { name: 'Website:', value: 'https://playantares.com', inline: false }
            )
            .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms. | Antares Network`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');

        //send message in private message
        message.author.send(ipEmbed);
        console.log(`The user, ${message.author.username} recieved ${PREFIX}ip in a private message`);
        logToConsole.log(message.guild, "ip");

    }
}
