const colors = require('colors');


module.exports = {
    command: async function (guild, message) {
        console.log(`COMMAND`.red, `[${guild.name}]`.green, `[${message.channel.name}]`.blue, `[${message.author.username}]`.yellow, `--`.grey, `${message.content}`.cyan)
    },
    message: function (guild, message) {
        console.log(`MESSAGE`.magenta, `[${guild.name}]`.green, `[${message.channel.name}]`.blue, `[${message.author.username}]`.yellow, `--`.grey, `${message.content}`.cyan)
    }
}