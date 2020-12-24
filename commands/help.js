const exceptionHandler = require("../handlers/exceptionHandler");
const logToConsole = require('../logToConsole');


//send help command
require('../handlers/exceptionHandler');
module.exports = {
    helpCMD: function(PREFIX, message) {
                exceptionHandler.notEnabledMsg(message, 'help');
                logToConsole.log(message.guild, "help");

    }
}