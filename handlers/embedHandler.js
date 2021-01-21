//embed.js - This will handle formatting for all types of embeds sent
const Discord = require('discord.js');

module.exports = {
  regularEmbed: function (message, imageUrl, type) {
    const Embed = new Discord.MessageEmbed()
      .setColor('#ff3505')
      .setURL('https://discord.gg/6pZ2wtGANP')
      .setTitle(type)
      .setImage(imageUrl)
      .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot | ${botVersion}`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
    message.channel.send(Embed);
  }
}
