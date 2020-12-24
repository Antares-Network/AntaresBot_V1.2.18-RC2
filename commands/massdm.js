//dm everyone with predefined role in server
const roleHandler = require('../handlers/roleHandler');
const exceptionHandler = require('../handlers/exceptionHandler');
const logToConsole = require('../logToConsole');

module.exports = {
    massdmCMD: function (PREFIX, message) {
        //delete the massdm command
        message.delete();
        //check if user has the adminRole
        if (roleHandler.checkAdmin(message)) {
            exceptionHandler.notEnabledMsg(message, 'massdm');
        } else {
            roleHandler.noPermissionMsg(message, 'massdm');
        }
        logToConsole.log(message.guild, "massdm");


    }
}