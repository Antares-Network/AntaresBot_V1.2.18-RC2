const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');
const logToConsole = require('../events/logToConsole');


module.exports = {
    dogCMD: function (message) {
        message.delete();
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(json => embedHandler.animalEmbed(message, json, "dog"));
        logToConsole.log(message.guild, "dog");
    },
    help: function (message) {
        message.channel.send("The _ command is used for: ")
    }
}