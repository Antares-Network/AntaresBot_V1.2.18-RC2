const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');
const logToConsole = require('../events/logToConsole');

//get a random cat image from the http://aws.random.cat/meow api
module.exports = {
    catCMD: function (message) {
        //request a cat from the api
        try {
            fetch('http://aws.random.cat/meow')
                .then(res => res.json())
                .then(json => embedHandler.regularEmbed(message, json.file, 'Random Cat Picture'));
        } catch (e) {
            console.error(e)
            message.channel.send("Socket hang-up error. Please try again.");
        }
        //send to the console that this command was run
        logToConsole.command(message.guild, message);
    }
}
