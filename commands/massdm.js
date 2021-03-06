//dm everyone with predefined role in server
const roleHandler = require('../handlers/roleHandler');
const exceptionHandler = require('../handlers/exceptionHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    massdmCMD: function (message) {
        //delete the massdm command
        message.delete();
        //check if user has the adminRole
        if (roleHandler.checkBotOwner(message)) {
            exceptionHandler.notEnabledMsg(message, 'massdm');
        } else {
            roleHandler.noPermissionMsg(message, 'massdm');
        }
        logToConsole.command(message.guild, message);
    }
}