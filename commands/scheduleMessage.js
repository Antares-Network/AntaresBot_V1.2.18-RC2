//send a scheduled message
const exceptionHandler = require('../handlers/exceptionHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    scheduleCMD: function (message) {
        logToConsole.command(message.guild, message);
        exceptionHandler.notEnabledMsg(message, 'scheduleMSG');
    }
}