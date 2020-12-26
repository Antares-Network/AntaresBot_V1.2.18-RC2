const exceptionHandler = require('../handlers/exceptionHandler');
const roleHandler = require('../handlers/roleHandler');
const logToConsole = require('../events/logToConsole');


module.exports = {
    removeCMD: async function (PREFIX, message) {
        if (roleHandler.checkAdmin(message)) {
            exceptionHandler.notEnabledMsg(message, "remove");
            message.channel.send("If you would like to request that all your data be removed from our servers, please DM @nathen418#0002");
        } else {
            roleHandler.noPermissionMsg(message, "remove")
        }
        logToConsole.log(message.guild, "remove");

    }
}