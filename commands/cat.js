const embedHandler = require('../handlers/embedHandler');
const fetch = require('node-fetch');

module.exports = {
    catCMD: function (PREFIX, message) {
        message.delete();
        fetch('http://aws.random.cat/meow')
            .then(res => res.json())
            .then(json => embedHandler.animalEmbed(message, json, "cat"));
        console.log(PREFIX + "cat command called");
    }
}