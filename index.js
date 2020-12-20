//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1

/*TODO LIST
	configure DB storage with mongoDB
	let all needed vars be env vars and configurable
	let all needed vars be stored in a database so the bot can work accross servers
	create help command
	add who the dm goes to using console.log for dm command

*/

const Discord = require('discord.js');
const fetch = require('node-fetch');
var onReady = require('./onReady.js');
var roleHandler = require('./roleHandler.js');
var embedHandler = require('./embedHandler.js');
var eventTimer = require('./eventTimer.js');
const guildModel = require('./models/guild.js');
const { connect } = require('mongoose');
require('dotenv').config();
const bot = new Discord.Client();
const PREFIX = process.env.BOT_PREFIX;
const adminRole = process.env.BOT_ADMIN_ROLE;
const santaRole = process.env.BOT_SANTA_ROLE;
const defaultBotChannel = process.env.BOT_DEFAULT_CHANNEL;


//actions to run at bot startup
bot.on('ready', async () => {
	onReady.startup(PREFIX, adminRole, santaRole, bot)
	console.log("Startup script has run")
});

//actions to run when the bot recieves a message
bot.on('message', async (message) => {

	if (message.channel.type == "dm") {
		console.log("User: " + message.author.username + " tried to send me a command in Dm's but It got rejected.")
		message.author.send("I do not respond to commands or messages sent in private channels, but only to those sent in Servers.")
	}

	function checkAdmin() {
		//return boolean if user has the specified role (admin)
		console.log("Checked if " + message.author.username + " has admin role with ID: " + adminRole);
		return message.member.roles.cache.has(adminRole);
	}
	function noPermissionMsg(command) {
		//send the following message to the channel the command originated
		message.channel.send("You do not have the required permissions to run this command.");
		console.log("User: " + message.author.username + " tried to use command: " + command + ", but did not have the correct permission");
	}

	function notEnabledMsg(command) {
		//send the following message to the channel the command originated
		message.channel.send("This command is not enabled yet.");
		console.log("User: " + message.author.username + " tried to use command: " + command + ", but it was not enabled");
	}


	function noSuchCommand(command) {
		message.channel.send("No such command exists. Check your syntax.");
		//must fix this. currently no command gets sent to this function
		console.log("User: " + message.author.username + " tried to use command: " + command + ", but that command does not exist.");

	}

	function animalEmbedSend(json, animal) {
		if(animal == "dog"){
			const dogEmbed = new Discord.MessageEmbed()
				.setColor('#ff3505')
				.setTitle('Random Dog Picture')
				.setImage(json.message)
				.setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
			message.channel.send(dogEmbed);
		} else if(animal == "cat"){
			const catEmbed = new Discord.MessageEmbed()
			.setColor('#ff3505')
			.setTitle('Random Cat Picture')
			.setImage(json.file)
			.setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
		message.channel.send(catEmbed);
		}
	}

	//check each message for the bot PREFIX
	let args = message.content.substring(PREFIX.length).split(' ');

	//check if user is playing santa game by detecting '+catch'
	if (message.content === "+catch") {

		//check if player has SantaPlayer role already
		if (message.member.roles.cache.has(santaRole)) {
			console.log("Tried to assign the role 'SantaPlayer' to " + message.author.username + ", but they already have role 'SantaPlayer' already");
		} else {
			//if player doesn't already have the SantaPlayer role, give it to them
			message.member.roles.add(santaRole);
			console.log("User " + message.author.username + " was assigned role 'SantaPlayer' by running '+catch' ")
		}
	}
	
	if(message.content === '&create') {
		const doc = new guildModel({ id:message.guild.id});
		await doc.save();
		message.channel.send('Made new doccument');
	} else if (message.content === '&prefix'){
		const req = await guildModel.findOne({ id:message.guild.id });
		if(!req) return message.channel.send("Sorry doc does not exist");
		return message.channel.send(`found a document! prefix: ${req.prefix}`);
	} else if (message.content === '&prefix ^') {
		const doc = await guildModel.findOneAndUpdate({ id:message.guild.id}, { $set: { prefix: '^'} }, {new: true});
		return message.channel.send(`Set the prefix to ${doc.prefix}`);
	}

	if (!message.content.startsWith(PREFIX)) return;

	switch (args[0]) {
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
			}
			break;

		//dm someone based on userID in server
		case 'dm':
			//delete the dm command
			message.delete();
			console.log(PREFIX + "dm command called");
			//check if user has the adminRole
			if (checkAdmin()) {
				if (isNaN(args[1])) {
					const member = message.mentions.members.first().id;
					console.log(member);
					args.shift();
					args.shift();
					var msg = args.join(" ");
					bot.users.cache.get(member).send(msg);
					console.log("The user, " + message.author.username + " ran " + PREFIX + "dm with the message: " + msg);
				} else {

					//convert the message into something that can be easily sent by the bot
					var userID = args[1];
					args.shift();
					args.shift();
					var msg = args.join(" ");
					bot.users.cache.get(userID).send(msg);
					console.log("The user, " + message.author.username + " ran " + PREFIX + "say with the message: " + msg);
				}
			} else {
				noPermissionMsg('dm');
			}
			break;

		//dm everyone with predefined role in server
		case 'massdm':
			//delete the massdm command
			message.delete();
			console.log(PREFIX + "massdm command called");
			//check if user has the adminRole
			if (checkAdmin()) {
				notEnabledMsg('massdm');
			} else {
				noPermissionMsg('massdm');
			}
			break;
			
		//get a random cat image from the http://aws.random.cat/meow api
		case 'cat':
			//delete the cat command
			message.delete();
			fetch('http://aws.random.cat/meow')
				.then(res => res.json())
				.then(json => animalEmbedSend(json, "cat"));
			 console.log(PREFIX + "cat command called");
			break;

		//get a random cat image from the https://dog.ceo/api/breeds/image/random api
		case 'dog':
			//delete the dog command
			message.delete();
			fetch('https://dog.ceo/api/breeds/image/random')
				.then(res => res.json())
				.then(json => animalEmbedSend(json, "dog"));
			console.log(PREFIX + "dogcommand called");
			break;

		//send a message with all the commands listed in an embed
		case 'help':
			console.log(PREFIX + "help command called");
			notEnabledMsg('help');
			break;
		
		//shedule a message to be sent
		case 'scheduleMSG':
			console.log(PREFIX + "scheduleMSG command called");
			notEnabledMsg('scheduleMSG');
			break;
		default:
			//delete unknown command
			message.delete();
			//return message that the entered command is invalid
			noSuchCommand();
	}
});

(async () => {
	var mongo_uri = String(process.env.BOT_MONGO_PATH);
	console.log('Trying to connect to MongoDB')
	await connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
	});
	console.log('Connected to MongoDB')
	bot.login(process.env.BOT_TOKEN);
})()

//bot.login(process.env.BOT_TOKEN);
//login to the discord api
//BOT_TOKEN is the Client Secret in the heroku dashboard
//bot.login(process.env.BOT_TOKEN);
