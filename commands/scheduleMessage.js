//send a scheduled message
const exceptionHandler = require('../handlers/exceptionHandler');
const logToConsole = require('../logToConsole');

module.exports = {
    scheduleCMD: function (PREFIX, message) {
        logToConsole.log(message.guild, "scheduleMSG");
        exceptionHandler.notEnabledMsg(message, 'scheduleMSG');
    }
}