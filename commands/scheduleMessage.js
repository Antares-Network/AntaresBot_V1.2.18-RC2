//send a scheduled message
const exceptionHandler = require('../handlers/exceptionHandler.js');
module.exports = {
    scheduleCMD: function (PREFIX, message) {
        console.log(PREFIX + "scheduleMSG command called");
        exceptionHandler.notEnabledMsg(message, 'scheduleMSG');
    }
}