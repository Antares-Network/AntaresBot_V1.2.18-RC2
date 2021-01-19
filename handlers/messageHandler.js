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
const help = require('../commands/help');
const guildModel = require('../models/guild');
const prefix = require('../commands/prefix');
const remove = require('../commands/remove');
const reddit = require('../commands/reddit');
const create = require('../commands/create');
const guildMsg = require('../commands/guildMsg');
const restart = require('../commands/restart');
const logToConsole = require('../events/logToConsole');
const serverInvites = require('../commands/serverInvites');
const scheduleMessage = require('../commands/scheduleMessage')
const tictactoe = require('../commands/tictactoe');
const github = require('../commands/github');
const defaultChannel = require('../commands/defaultChannel');
const roleHandler = require('../handlers/roleHandler');



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

        var PREFIX;
        const srv = await guildModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
        if (srv == null){
           PREFIX = '&';
           //message.channel.send("Something has gone wrong. If you are the server owner please try running the command `&create`");
           create.createCMD(message, bot);
        } else {
            PREFIX = srv.prefix; // create a constant that holds the prefix for the guild
        }
        if (!message.content.startsWith(PREFIX)) {
            //for debug only and to see if the bot is recieving messages when issues arise in command processing
            //this line complient with the bot's privacy policy. Read it at &privacy.
            logToConsole.message(message.guild, message);
            return;
        }
        //split prefix from argument
        let args = message.content.substring(PREFIX.length).split(' ');


        //check if a message is not sent in the default channel, check if ther is a default channel set
        //if there is one, deny the message and tell the user to use this command in that channel
        //else tell the user that the server owner needs to set a default channel first
        //before the bot can be used
        if (message.channel.id != srv.GUILD_DEFAULT_CHANNEL) {
            if (srv.GUILD_DEFAULT_CHANNEL === null) {
                message.channel.send("The server owner has not set a default channel yet.");
                defaultChannel.defaultChannelCMD(message, args);
                return; //exit the loop and don't parce the command
            } else if (roleHandler.checkAdmin(message)) {
                //intentionally left blank
                //yes I know that there will always be a message to use the bot in the default channel
                //every time an admin uses the bot elsewhere but I don't know how to fix it
            } else {
                //ping the user in the default channel
                bot.channels.cache.get(srv.GUILD_DEFAULT_CHANNEL).send(`<@${message.author.id}> Please use me in this channel`)
                return;
            }
        }

        switch (args[0]) {
            //if there is no command following the prefix, discard it
            case '':
                return
            //remove the entire config from the database 
            case 'remove':
                //remove PII from DB but not Server join log and some other data
                remove.removeCMD(message)
                break;
            case 'defaultChannel':
                defaultChannel.defaultChannelCMD(message, args);
                break;
            //allow the setting of a custom prefix for each guild
            case 'prefix':
                prefix.prefixCMD(message, args);
                break;
            //send a help message
            case 'help':
                help.helpCMD(message);
                break;
                //gets a random meme from a list of subreddits defined on the npm website for this package
            case 'reddit':
                reddit.redditCMD(message);
                break;
                case 'meme':
                    reddit.redditCMD(message);
                    break;
            //get a random cat image from the http://aws.random.cat/meow api
            case 'cat':
                cat.catCMD(message);
                break;
            //get a random dog image from the https://dog.ceo/api/breeds/image/random api
            case 'dog':
                dog.dogCMD(message);
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
            //dm a user by mentioning them or using their user id
            case 'dm':
                dm.dmCMD(message, bot, args);
                break;
            //dm everyone with predefined role in server
            case 'massdm':
                massdm.massdmCMD(message);
                break;
            //shedule a message to be sent
            case 'scheduleMSG':
                scheduleMessage.scheduleCMD(message, args);
                break;
            //send an invite message for the bot
            case 'invite':
                invite.inviteCMD(message);
                break;
            //send the privacy policy for the bot
            case 'privacy':
                privacy.privacyCMD(message);
                break;
            //send a link to the github repo for this bot
            case 'github':
                github.githubCMD(message);
                break;
            //logs out and back into the discord api
            case 'restart':
                restart.restartCMD(message, bot);
                break;
            //play a game of tictactoe
            case 'tictactoe':
                tictactoe.tictactoeCMD(bot);
                break;
            //get or generate a link to the server the bot is in 
            case 'generateLink':
                serverInvites.listInvites(bot, message, args);
                return;
            //send a message to all guilds with the bot invited
            case 'guildMSG':
                guildMsg.guildMsgCMD(message, bot, args);
                break;
            //send the version number the bot is currently on
            case 'version':
                message.channel.send(`I am running Version: ${botVersion}`)
        }
    }
}
