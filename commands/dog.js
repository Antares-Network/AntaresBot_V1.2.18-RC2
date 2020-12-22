const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');

module.exports = {
    dogCMD: function (PREFIX, message) {
        message.delete();
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(json => embedHandler.animalEmbed(message, json, "dog"));
        console.log(PREFIX + "dogcommand called");
    }
}