//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1

/*TODO LIST
	let all needed vars be env vars and configurable
	let all needed vars be stored in a database so the bot can work accross servers
	create help command
*/

const Discord = require('discord.js');
const fetch = require('node-fetch');
const onReady = require('./onReady.js');
const roleHandler = require('./handlers/roleHandler.js');
const exceptionHandler = require('./handlers/exceptionHandler.js');
const embedHandler = require('./handlers/embedHandler.js');
const eventTimer = require('./handlers/eventTimer.js');
const guildModel = require('./models/guild.js');
const privacy = require("./commands/privacy.js")
const scheduleMessage = require('./commands/scheduleMessage.js')
const { connect } = require('mongoose');
const moment = require('moment');
const help = require('./commands/help.js');
require('dotenv').config();
const bot = new Discord.Client();
const invite = require('./commands/invite');
const ping = require('./commands/ping');
const ip = require('./commands/ip.js');
const dm = require('./commands/dm');
const say = require('./commands/say.js');
const massdm = require('./commands/massdm.js');
const adminRole = process.env.BOT_ADMIN_ROLE;

//actions to run at bot startup
bot.on('ready', async () => {
	onReady.startup(adminRole, bot)
	console.log("Startup script has run")
});

bot.on("guildCreate", async (guild) => {
	//in the future move this to a seperate file
	const doc = new guildModel({
		GUILD_CREATED_AT: guild.createdAt,
		GUILD_NAME: guild.name,
		GUILD_ID: guild.id,
		GUILD_DESCRIPTION: guild.description,
		GUILD_OWNER: guild.owner,
		GUILD_OWNER_ID: guild.ownerID,
		GUILD_MEMBERS: guild.memberCount,
		GUILD_ICON_URL: guild.iconURL(),
		prefix: '&'
	});
	await doc.save();
	console.log("I joined a new Server with name: " + guild.name)
})
//actions to run when the bot recieves a message
bot.on('message', async (message) => {

	//check if user wants to create a doccument
	if (message.content === '&create') {
		if (roleHandler.checkAdmin(message, adminRole)) {
			let guild = message.guild;
			const doc = new guildModel({
				GUILD_CREATED_AT: guild.createdAt,
				GUILD_NAME: guild.name,
				GUILD_ID: guild.id,
				GUILD_DESCRIPTION: guild.description,
				GUILD_OWNER: guild.owner,
				GUILD_OWNER_ID: guild.ownerID,
				GUILD_MEMBERS: guild.memberCount,
				GUILD_ICON_URL: guild.iconURL(),
				prefix: '&'
			});
			await doc.save();
			message.channel.send('Made new doccument');
		}
	}

	//discard message unless it starts with the guild prefix
	const srv = await guildModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
	const PREFIX = srv.prefix; // create a constant that holds the prefix for the guild
	if (!message.content.startsWith(PREFIX)) return; //discard anything that does not start with that prefix


	//if the user sends a message to the bot in a dm reject the message
	if (message.channel.type == "dm") {
		console.log("User: " + message.author.username + " tried to send me a command in Dm's but It got rejected.")
		message.author.send("I do not respond to commands or messages sent in private channels, but only to those sent in Servers.")
	}

	//check each message for the bot PREFIX
	let args = message.content.substring(PREFIX.length).split(' ');


	switch (args[0]) {

		case 'create':
			//automatically deny any request for create because that needs the & to be its prefix.
			roleHandler.noPermissionMsg(message, 'create');
			break;

		//allow the setting of a custom prefix for each guild
		case 'prefix':
			//check if the user is an admin
			if (!roleHandler.checkAdmin(message, adminRole)) {
				//check to see if a prefix has already been set up for this guild and grab it if it exists already
				const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
				//if the guild has a prefix, send it here
				message.channel.send(`This server's prefix is: **${req.prefix}**`);

			} else if (roleHandler.checkAdmin(message, adminRole)) {
				//if the command was sent with an argument, update the guild's prefix, and let the user know

				//check to see if a prefix has already been set up for this guild and grab it if it exists already
				const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
				//if the guild has a prefix, send it here
				message.channel.send(`This server's prefix is: **${req.prefix}**`);
				if (args[1]) {
					const doc = await guildModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { prefix: args[1] } }, { new: true });
					message.channel.send(`Set the prefix to ${doc.prefix}`);
					await doc.save();
				}
			}
			break;
		//remove the entire config from the database 
		case 'remove':
			if (roleHandler.checkAdmin(message, adminRole)) {
				const document = await guildModel.findOneAndDelete({ id: message.guild.id });
				message.channel.send(`Deleted the document with an ID of ${document.id} and prefix of ${document.prefix}`);
			}
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
			say.sayCMD(PREFIX, message, args, adminRole);
			break;
		//dm someone 
		case 'dm':
			dm.dmCMD(PREFIX, message, bot, args, adminRole);
			break;
		//dm everyone with predefined role in server
		case 'massdm':
			massdm.massdmCMD(PREFIX, message, adminRole);
			break;
		//get a random cat image from the http://aws.random.cat/meow api
		case 'cat':
			//delete the cat command
			message.delete();
			fetch('http://aws.random.cat/meow')
				.then(res => res.json())
				.then(json => embedHandler.animalEmbed(message, json, "cat"));
			console.log(PREFIX + "cat command called");
			break;

		//get a random cat image from the https://dog.ceo/api/breeds/image/random api
		case 'dog':
			//delete the dog command
			message.delete();
			try {
				fetch('https://dog.ceo/api/breeds/image/random')
					.then(res => res.json())
					.then(json => embedHandler.animalEmbed(message, json, "dog"));
				console.log(PREFIX + "dogcommand called");
			} catch (error) {
				console.error(error);
				message.channel.send('`' + error + '`');
			}
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
});

(async () => {
	var mongo_uri = String(process.env.BOT_MONGO_PATH);
	console.log('Trying to connect to MongoDB')
	await connect(mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
	console.log('Connected to MongoDB')
	//login to the discord api
	//BOT_TOKEN is the Client Secret in the heroku dashboard
	bot.login(process.env.BOT_TOKEN);
})()