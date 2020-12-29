//send a scheduled message
const exceptionHandler = require('../handlers/exceptionHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    scheduleCMD: function (message) {
        logToConsole.command(message.guild, "scheduleMSG");
        exceptionHandler.notEnabledMsg(message, 'scheduleMSG');
    },
    help: function (message) {
        message.channel.send("The _ command is used for: ")
    }
}