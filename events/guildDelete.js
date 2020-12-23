const exceptionHandler = require('../handlers/exceptionHandler');
const guildModel = require('../models/guild');
require('../handlers/exceptionHandler');

module.exports = {
    event: async function(){
        exceptionHandler.notEnabledMsg(message, "remove");
    }
}


// find by document id and update and pop or remove item in array