//send a scheduled message
const exceptionHandler = require('../handlers/exceptionHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    scheduleCMD: function (message) {
        logToConsole.log(message.guild, "scheduleMSG");
        exceptionHandler.notEnabledMsg(message, 'scheduleMSG');
    }
}