const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');
const logToConsole = require('../events/logToConsole');

//get a random dog image from the https://dog.ceo/api/breeds/image/random api
module.exports = {
    dogCMD: function (message) {
        //request a dog from the api
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(json => embedHandler.animalEmbed(message, json, "dog"));

        //send to the console that this command was run
        logToConsole.command(message.guild, message);
    }
}