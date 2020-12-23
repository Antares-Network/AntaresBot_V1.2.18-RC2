//dm everyone with predefined role in server
const roleHandler = require('../handlers/roleHandler');
const exceptionHandler = require('../handlers/exceptionHandler');
module.exports = {
    massdmCMD: function (PREFIX, message) {
        //delete the massdm command
        message.delete();
        console.log(PREFIX + "massdm command called");
        //check if user has the adminRole
        if (roleHandler.checkAdmin(message)) {
            exceptionHandler.notEnabledMsg(message, 'massdm');
        } else {
            roleHandler.noPermissionMsg(message, 'massdm');
        }

    }
}