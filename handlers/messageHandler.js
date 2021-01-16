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
const help = require('../commands/help');
const guildModel = require('../models/guild');
const prefix = require('../commands/prefix');
const docCreate = require('../events/docCreate');
const remove = require('../commands/remove');
const piiUpdate = require('../events/piiUpdate');
const reddit = require('../commands/reddit');
const create = require('../commands/create');
const guildMsg = require('../commands/guildMsg');
const restart = require('../commands/restart');
const logToConsole = require('../events/logToConsole');
const serverInvites = require('../commands/serverInvites');
const tictactoe = require('../commands/tictactoe');
const singleInvite = require('../commands/singleInvite');
const github = require('../commands/github');

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
            piiUpdate.event(guild, bot);
            message.channel.send('Made new doccument');
        }

        const PREFIX = srv.prefix; // create a constant that holds the prefix for the guild
        if (!message.content.startsWith(PREFIX)) {
            //for debug only and to see if the bot is recieving messages when issues arise in command processing
            //this line complient with the bot's privacy policy. Read it at &privacy.
            logToConsole.message(message.guild, message);
            return;
        }
        //split prefix from argument
        let args = message.content.substring(PREFIX.length).split(' ');


        //check if the user wants to create a new doc for their guild
        create.createCMD(message, bot);

        switch (args[0]) {
            case 'github':
                github.githubCMD(message);
                break;
            case 'singleInvite':
                singleInvite.singleInviteCMD(message);
                break;
            case 'restart':
                restart.restartCMD(message, bot);
                break;
            case 'tictactoe':
                tictactoe.tictactoeCMD(bot);
                break;
            case 'listInvites':
                serverInvites.listInvites(bot, message);
                return;
            case 'guildMSG':
                guildMsg.guildMsgCMD(message, bot, args);
                break;
            case '':
                return;
            case 'create':
                return;
            //check if user wants to grab an image off of a subreddit 
            case 'reddit':
                reddit.redditCMD(message);
                break;
            //allow the setting of a custom prefix for each guild
            case 'prefix':
                prefix.prefixCMD(message, args);
                break;
            //remove the entire config from the database 
            case 'remove':
                //remove PII from DB but not Server join log and some other data
                remove.removeCMD(message)
                break;
            //check if command is ping
            case 'ping':
                ping.pingCMD(message);
                break;
            //check if command is ip
            case 'ip':
                ip.ipCMD(message);
                break;
            //make the bot say something in a particular channel
            case 'say':
                say.sayCMD(message, args);
                break;
            //dm someone 
            case 'dm':
                dm.dmCMD(message, bot, args);
                break;
            //dm everyone with predefined role in server
            case 'massdm':
                massdm.massdmCMD(message);
                break;
            //get a random cat image from the http://aws.random.cat/meow api
            case 'cat':
                cat.catCMD(message);
                break;
            //get a random cat image from the https://dog.ceo/api/breeds/image/random api
            case 'dog':
                dog.dogCMD(message);
                break;
            //send a help message
            case 'help':
                help.helpCMD(message);
                break;
            //shedule a message to be sent
            case 'scheduleMSG':
                scheduleMessage.scheduleCMD(message);
                break;
            //send an invite message for the bot
            case 'invite':
                invite.inviteCMD(message);
                break;
            //send the privacy policy for the bot
            case 'privacy':
                privacy.privacyCMD(message);
                break;
        }
    }
}