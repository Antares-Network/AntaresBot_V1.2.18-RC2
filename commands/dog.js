const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');
const logToConsole = require('../events/logToConsole');

module.exports = {
    dogCMD: function (message) {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(json => embedHandler.animalEmbed(message, json, "dog"));
        logToConsole.command(message.guild, message);
    }
}