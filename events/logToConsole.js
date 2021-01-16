const piiModel = require('../models/guild');


module.exports = {
    command: async function (guild, message) {
        console.log(message.author.username + " in  the server \"" + guild.name + "\" ran the command: " + message.content);
    },
    message: function (guild, message) {
        console.log(message.author.username + " in  the server \"" + guild.name + "\" sent the message: " + message.content);
    }
}