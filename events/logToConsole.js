const colors = require('colors');


module.exports = {
    command: async function (guild, message) {
        //console.log(message.author.username + " in  the server \"" + guild.name + "\" ran the command: " + message.content);
        console.log(`COMMAND`.red, `[${guild.name}]`.green, `[${message.channel.name}]`.blue, `[${message.author.username}]`.yellow, `--`.grey, `${message.content}`.cyan)
    },
    message: function (guild, message) {
        console.log(`MESSAGE`.magenta, `[${guild.name}]`.green, `[${message.channel.name}]`.blue, `[${message.author.username}]`.yellow, `--`.grey, `${message.content}`.cyan)
        //console.log(message.author.username + " in  the server \"" + guild.name + "\" sent the message: " + message.content);
    }
}