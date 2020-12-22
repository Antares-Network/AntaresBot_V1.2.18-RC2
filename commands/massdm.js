//dm everyone with predefined role in server
const roleHandler = require('../handlers/roleHandler.js');
const exceptionHandler = require('../handlers/exceptionHandler.js');
module.exports = {
    massdmCMD: function (PREFIX, message, adminRole) {
        //delete the massdm command
        message.delete();
        console.log(PREFIX + "massdm command called");
        //check if user has the adminRole
        if (roleHandler.checkAdmin(message, adminRole)) {
            exceptionHandler.notEnabledMsg(message, 'massdm');
        } else {
            roleHandler.noPermissionMsg(message, 'massdm');
        }

    }
}