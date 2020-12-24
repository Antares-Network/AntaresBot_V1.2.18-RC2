const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');
const logToConsole = require('../logToConsole');

module.exports = {
    catCMD: function (PREFIX, message) {
        message.delete();
        fetch('http://aws.random.cat/meow')
            .then(res => res.json())
            .then(json => embedHandler.animalEmbed(message, json, "cat"));
        logToConsole.log(message.guild, "cat");
    }
}
