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
const { connect } = require('mongoose');
const moment = require('moment');
require('dotenv').config();
const bot = new Discord.Client();
const adminRole = process.env.BOT_ADMIN_ROLE;
const defaultBotChannel = process.env.BOT_DEFAULT_CHANNEL;

//actions to run at bot startup
bot.on('ready', async () => {
	onReady.startup(adminRole, bot)
	console.log("Startup script has run")
});

bot.on("guildCreate", async  (guild) => {
	//in the future move this to a seperate file
	const doc = new guildModel({
		prefix: '&',
		GUILD_NAME: guild.name,
		GUILD_ID: guild.id,
		GUILD_OWNER_ID: guild.ownerID,
		GUILD_MEMBERS: guild.memberCount,
		GUILD_ICON_URL: guild.iconURL()

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
				prefix: '&',
				GUILD_NAME: guild.name,
				GUILD_ID: guild.id,
				GUILD_OWNER_ID: guild.ownerID,
				GUILD_MEMBERS: guild.memberCount,
				GUILD_ICON_URL: guild.iconURL()
		
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
			if (roleHandler.checkAdmin(message, adminRole)) {
				//check to see if a prefix has already been set up for this guild and grab it if it exists already
				const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
				//if the guild has a prefix, send it here
				message.channel.send(`found a document! prefix: ${req.prefix}`);

				//if the command was sent with an argument, update the guild's prefix, and let the user know
				if (args[1]) {
					const doc = await guildModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { prefix: args[1] } }, { new: true });
					message.channel.send(`Set the prefix to ${doc.prefix}`);
					await doc.save();
				}
			} else {
				//if the user is not an admin decline the command
				roleHandler.noPermissionMsg(message, 'prefix');
			}
			break;
		//remove the entire config from the database 
		case 'remove':
			if (roleHandler.checkAdmin(message, adminRole)) {
				const document = await guildModel.findOneAndDelete({ id: message.guild.id });
				message.channel.send(`Deleted the document with an ID of ${document.id} and prefix of ${document.prefix}`);
				break;
			}


		//check if command is ping
		case 'ping':
			//delete ping command
			message.delete();
			const pingEmbed = new Discord.MessageEmbed()
				.setColor('#ff3505')
				.setTitle('Bot/API Ping')
				.addField('Ping:', `🏓 | Latency is: **${Date.now() - message.createdTimestamp}**ms.`);
			message.channel.send(pingEmbed);
			break;
		//check if command is ip
		case 'ip':
			//delete the ip command
			message.delete();
			//create new embed
			const ipEmbed = new Discord.MessageEmbed()
				.setColor('#ff3505')
				.setTitle('Antares Minecraft Server')
				.addFields(
					//enter text into embed
					{ name: 'Server Description:', value: 'The Antares Network Minecraft server has a few gamemodes for you to play on.', inline: true },
					{ name: 'Game Modes:', value: 'Factions, Syblock, Prisons, Vanilla, and Creative Plots', inline: true },
					{ name: 'Server IP:', value: 'mc.playantares.com', inline: false },
					{ name: 'Website:', value: 'https://playantares.com', inline: false }
				)
				.setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms. | Antares Network`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');

			//send message in private message
			message.author.send(ipEmbed);
			console.log("The user, " + message.author.username + " recieved " + PREFIX + "ip in a private message");
			break;

		//make the bot say something in a particular channel
		case 'say':
			//delete the say command
			//message.delete();
			console.log(PREFIX + "say command called");
			if (roleHandler.checkAdmin(message, adminRole)) {
				//check if the first argument is a number
				if (isNaN(args[1])) {
					args.shift();
					var msg = args.join(" ");
					message.channel.send(msg);
					console.log("The user, " + message.author.username + " ran " + PREFIX + "say with the message: " + msg);
				} else {

					//convert the message into something that can be easily sent by the bot
					var chanID = args[1];
					args.shift();
					args.shift();
					var msg = args.join(" ");
					bot.channels.cache.get(chanID).send(msg);
					console.log("The user, " + message.author.username + " ran " + PREFIX + "say with the message: " + msg);
				}
			} else [
				roleHandler.noPermissionMsg(message, 'say')
			]
			break;

		//dm someone based on userID in server
		case 'dm':
			//delete the dm command
			message.delete();
			console.log(PREFIX + "dm command called");
			//check if user has the adminRole
			if (roleHandler.checkAdmin(message, adminRole)) {
				if (isNaN(args[1])) {
					const member = message.mentions.members.first().id;
					console.log(member);
					args.shift();
					args.shift();
					var msg = args.join(" ");
					bot.users.cache.get(member).send(msg);
					console.log("The user, " + message.author.username + " ran " + PREFIX + "dm with the message: " + msg + " to " + member.username);
				} else {

					//convert the message into something that can be easily sent by the bot
					var userID = args[1];
					args.shift();
					args.shift();
					var msg = args.join(" ");
					bot.users.cache.get(userID).send(msg);
					console.log("The user, " + message.author.username + " ran " + PREFIX + "dm with the message: " + msg + " to " + member.username);
				}
			} else {
				roleHandler.noPermissionMsg(message, 'dm');
			}
			break;

		//dm everyone with predefined role in server
		case 'massdm':
			//delete the massdm command
			message.delete();
			console.log(PREFIX + "massdm command called");
			//check if user has the adminRole
			if (roleHandler.checkAdmin(message, adminRole)) {
				exceptionHandler.notEnabledMsg(message, 'massdm');
			} else {
				roleHandler.noPermissionMsg(message, 'massdm');
			}
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
			fetch('https://dog.ceo/api/breeds/image/random')
				.then(res => res.json())
				.then(json => embedHandler.animalEmbed(message, json, "dog"));
			console.log(PREFIX + "dogcommand called");
			break;

		//send a message with all the commands listed in an embed
		case 'help':
			console.log(PREFIX + "help command called");
			exceptionHandler.notEnabledMsg(message, 'help');
			break;

		//shedule a message to be sent
		case 'scheduleMSG':
			console.log(PREFIX + "scheduleMSG command called");
			exceptionHandler.notEnabledMsg(message, 'scheduleMSG');
			break;
		default:
			//delete unknown command
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