const embedHandler = require('../handlers/embedHandler');
const logToConsole = require('../events/logToConsole');
const fetch = require('node-fetch');


module.exports = {
    xkcdCMD: async function (message, args) {
        let comicNum = Math.floor(Math.random() * 2413);

        var url = `http://xkcd.com/${comicNum}/info.0.json`;
        


                //request a dog from the api
                fetch(url)
                .then(res => res.json())
                .then(json => embedHandler.regularEmbed(message, json.img, `Random Meme from Reddit`));

    
            //send to the console that this command was run
            logToConsole.command(message.guild, message);
    }
}