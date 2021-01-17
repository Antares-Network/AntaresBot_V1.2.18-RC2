const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');
const logToConsole = require('../events/logToConsole');

module.exports = {
    catCMD: function (message) {
        fetch('http://aws.random.cat/meow')
            .then(res => res.json())
            .then(json => embedHandler.animalEmbed(message, json, "cat"));
        logToConsole.command(message.guild, message);
    }
}
