const exceptionHandler = require("../handlers/exceptionHandler");
const logToConsole = require('../events/logToConsole');


//send help command
require('../handlers/exceptionHandler');
module.exports = {
    helpCMD: function (message) {
        exceptionHandler.notEnabledMsg(message, 'help');
        logToConsole.command(message.guild, message);

    }
}