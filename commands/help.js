const exceptionHandler = require("../handlers/exceptionHandler");

//send help command
require('../handlers/exceptionHandler');
module.exports = {
    helpCMD: function(PREFIX, message) {
        console.log(PREFIX + "help command called");
        exceptionHandler.notEnabledMsg(message, 'help');
    }
}