const prefix = require('../commands/prefix');
const invite = require('../commands/invite');
const ip = require('../commands/ip');
const ping = require('../commands/ping');
const reddit = require('../commands/reddit');
const cat = require('../commands/cat');
const dog = require('../commands/dog');
const privacy = require("../commands/privacy")



//send help command
require('../handlers/exceptionHandler');
module.exports = {
    helpCMD: function (message) {
        message.channel.send("This is a list of all the commands:");
        ip.help(message);
        cat.help(message);
        dog.help(message);
        reddit.help(message);
        prefix.help(message);
        invite.help(message);
        ping.help(message);
        privacy.help(message);
    }
}