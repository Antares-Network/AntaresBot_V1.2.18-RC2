const xkcd = require('xkcd-api');
const embedHandler = require('../handlers/embedHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    xkcdCMD: async function (message) {

        xkcd.random(function(error, response) {
            if (error) {
              console.error(error);
            } else {
              console.log(reponse);
            }
            embedHandler.regularEmbed(message, response, `Random XKCD comic`)
          });        
          logToConsole.command(message.guild, message);

    }
}