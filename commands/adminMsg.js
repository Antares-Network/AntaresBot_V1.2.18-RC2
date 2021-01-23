const Discord = require('discord.js');
const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');
const piiModel = require('../models/pii');

module.exports = {
    adminMsgCMD: function (message, bot, args) {
        if (roleHandler.checkBotOwner(message)) {
            //create 'msg' for the bot to send
            args.shift();
            var msg = args.join(" ");

            //get the list of guilds the bot is in
            var guildList = bot.guilds.cache

            try {
                //send a message to every guild this bot is in
                let messageToSend = new Discord.MessageEmbed()
                    .setColor('#ff3505')
                    .setURL('https://discord.gg//KKYw763')
                    .setTitle("Hello, you don't see me messaging in your server often...")
                    .setDescription('I have just flown in to tell you that my developers have something to say:')
                    .addField('Message:', `${msg}`)
                    .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
                guildList.forEach( async guild => {
                    const req = await piiModel.findOne({ GUILD_ID: guild.id }); //find the entry for the guild
                    if (req.GUILD_ADMIN_CHANNEL != null) {
                        //send the message in the default channel for this guild
                        bot.channels.cache.get(req.GUILD_ADMIN_CHANNEL).send(messageToSend)
                    } else {
                        guild.channels.cache.find(c => c.type === 'text').send(messageToSend)
                    }
                });
                logToConsole.command(message.guild, message);
            } catch (err) {
                //if there was an error send it here
                console.log(err);
            }
        } else {
            roleHandler.noPermissionMsg(message, 'adminMSG');
        }
    }
}