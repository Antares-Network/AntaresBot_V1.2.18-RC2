const exceptionHandler = require('../handlers/exceptionHandler');
const logToConsole = require('../events/logToConsole');

module.exports = {
    tictactoeCMD: function (message) {
        logToConsole.command(message.guild, message);
        exceptionHandler.notEnabledMsg(message, 'tictactoe');

    }
}