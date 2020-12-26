//this file deals with all messages that the bot needs to parse
//import all files that the bot needs to respond to commands
const invite = require('../commands/invite');
const ping = require('../commands/ping');
const ip = require('../commands/ip');
const dm = require('../commands/dm');
const say = require('../commands/say');
const massdm = require('../commands/massdm');
const cat = require('../commands/cat');
const dog = require('../commands/dog');
const privacy = require("../commands/privacy")
const scheduleMessage = require('../commands/scheduleMessage')
const exceptionHandler = require('./exceptionHandler');
const roleHandler = require('./roleHandler');
const help = require('../commands/help');
const guildModel = require('../models/guild');
const prefix = require('../commands/prefix');
const docCreate = require('../events/docCreate');
const remove = require('../commands/remove');
const piiUpdate = require('../events/piiUpdate');
const reddit = require('../commands/reddit');


module.exports = {
    messageHANDLE: async function (message, bot) {

        //if the message was sent by a bot, reject the message
        if (message.author.bot) return;
        //if the user sends a message to the bot in a dm reject the message
        if (message.channel.type == "dm") {
            console.log("User: " + message.author.username + " tried to send me a command in Dm's but It got rejected.")
            message.author.send("I do not respond to commands or messages sent in private channels, but only to those sent in Servers.")
            return;
        }

        //discard message unless it starts with the guild prefix
        const srv = await guildModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
        if (srv === null) {
            let guild = message.guild;
            docCreate.event(guild);
            message.channel.send('Made new doccument');
        }
        const PREFIX = srv.prefix; // create a constant that holds the prefix for the guild
        if (!message.content.startsWith(PREFIX)) return; //discard anything that does not start with that prefix

        //split prefix from argument
        let args = message.content.substring(PREFIX.length).split(' ');


        //check if user wants to create a doccument. This must be outside the switch (args[0]) loop so that it always searches for '&create'
        if (message.content === '&create') {
            const srv = await guildModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
            if (srv.GUILD_ID !== null) {
                message.channel.send("This Server already has a Doccument");
            } else if (roleHandler.checkAdmin(message)) {
                piiUpdate.event(message.guild, bot);
                docCreate.event(message.guild);

                message.channel.send('Made new doccument');
            } else {
                roleHandler.noPermissionMsg('&create');
            }
        }
        
        switch (args[0]) {
            case 'reddit':
                reddit.redditCMD(message, args[1]);
                break;
            case 'piiUpdate':
                piiUpdate.event(message.guild, message, bot);
                break;

            case 'create':
                console.log('User called the create command');
                break;

            //allow the setting of a custom prefix for each guild
            case 'prefix':
                prefix.prefixCMD(message, args);
                break;
            //remove the entire config from the database 
            case 'remove':
                //remove PII from DB but not Server join log and some other data
                remove.removeCMD(PREFIX, message)
                break;
            //check if command is ping
            case 'ping':
                ping.pingCMD(PREFIX, message);
                break;
            //check if command is ip
            case 'ip':
                ip.ipCMD(PREFIX, message);
                break;
            //make the bot say something in a particular channel
            case 'say':
                say.sayCMD(PREFIX, message, args);
                break;
            //dm someone 
            case 'dm':
                dm.dmCMD(PREFIX, message, bot, args);
                break;
            //dm everyone with predefined role in server
            case 'massdm':
                massdm.massdmCMD(PREFIX, message);
                break;
            //get a random cat image from the http://aws.random.cat/meow api
            case 'cat':
                cat.catCMD(PREFIX, message);
                break;
            //get a random cat image from the https://dog.ceo/api/breeds/image/random api
            case 'dog':
                dog.dogCMD(PREFIX, message);
                break;
            //send a help message
            case 'help':
                help.helpCMD(PREFIX, message);
                break;
            //shedule a message to be sent
            case 'scheduleMSG':
                scheduleMessage.scheduleCMD(PREFIX, message);
                break;
            //send an invite message for the bot
            case 'invite':
                invite.inviteCMD(PREFIX, message);
                break;
            //send the privacy policy for the bot
            case 'privacy':
                privacy.privacyCMD(PREFIX, message);
                break;
            default:
                //return message that the entered command is invalid
                exceptionHandler.noSuchCommand(message, message.content);
        }
    }
}