//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//embed.js - This will handle formatting for all types of embeds sent

const Discord = require('discord.js');

module.exports = {
  regularEmbed: function (message, imageUrl, type) {
    const Embed = new Discord.MessageEmbed()
        .setColor('#ff3505')
        .setTitle(type)
        .setImage(imageUrl)
        .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
      message.channel.send(Embed);
  },
  animalEmbed: function (message, json, animal) {
    if (animal == "dog") {
      const dogEmbed = new Discord.MessageEmbed()
        .setColor('#ff3505')
        .setTitle('Random Dog Picture')
        .setImage(json.message)
        .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
      message.channel.send(dogEmbed);
    } else if (animal == "cat") {
      const catEmbed = new Discord.MessageEmbed()
        .setColor('#ff3505')
        .setTitle('Random Cat Picture')
        .setImage(json.file)
        .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
      message.channel.send(catEmbed);
    }
  }
}