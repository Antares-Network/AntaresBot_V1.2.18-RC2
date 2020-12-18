//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1

//init vars and gc
const Discord = require('discord.js');
//const { get } = require("snekfetch");
var request = require("request");
const fetch = require('node-fetch');
const bot = new Discord.Client();
require('dotenv').config();
const catAPI = process.env.BOT_CAT_API_URL;
var dogAPI = "https://dog.ceo/api/breeds/image/random";

// dont remove this. I dont know why it is needed. it is not called anywhere but whatever
var cat = "http://aws.random.cat/meow";

const PREFIX = process.env.BOT_PREFIX;
const adminRole = process.env.BOT_ADMIN_ROLE;
const santaRole = process.env.BOT_SANTA_ROLE;
const defaultBotChannel = process.env.BOT_DEFAULT_CHANNEL;

function startup() {
	bot.user.setActivity('for ' + PREFIX + 'ip', { type: 'LISTENING' });
	console.log("Set bot status to LISTENING for " + PREFIX + "ip");
	console.log("Set bot prefix to be: " + PREFIX);
	console.log(`Logged in as ${bot.user.tag}`);
	console.log("The bot is online.");
	console.log("Set Admin role to be: " + adminRole);
	console.log("Set Santa role to be: " + santaRole);
}


//actions to run at bot startup
bot.on('ready', () => {
	startup();
	console.log("Startup script ran")
});

//actions to run when the bot recieves a message
bot.on('message', message => {

	if (message.channel.type == "dm") return;

	function checkAdmin() {
		//return boolean if user has the specified role (admin)
		console.log("Checked if " + message.author.username + " has admin role with ID: " + adminRole);
		return message.member.roles.cache.has(adminRole);
	}

	function notEnabledMsg(command) {
		//send the following message to the channel the command originated
		message.channel.send("This command is not enabled yet.");
		console.log("User: " + message.author.username + " tried to use command: " + command + ", but it was not enabled");
	}

	function noPermissionMsg(command) {
		//send the following message to the channel the command originated
		message.channel.send("You do not have the required permissions to run this command.");
		console.log("User: " + message.author.username + " tried to use command: " + command + ", but did not have the correct permission");
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
				.setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
			message.channel.send(dogEmbed);
		} else if(animal == "cat"){
			const catEmbed = new Discord.MessageEmbed()
			.setColor('#ff3505')
			.setTitle('Random Cat Picture')
			.setImage(json.file)
			.setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
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

	if (!message.content.startsWith(PREFIX)) return;

	switch (args[0]) {
		//check if command is ping
		case 'ping':
			message.channel.send('PONG');
			message.channel.send(`🏓 | Latency is: **${Date.now() - message.createdTimestamp}**ms.`);
			break;
		//check if command is ip
		case 'ip':

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
			console.log(PREFIX + "say command called");
			if (checkAdmin()) {
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
			console.log(PREFIX + "dm command called");
			//check if user has the adminRole
			if (checkAdmin()) {
				notEnabledMsg('dm');
			} else {
				noPermissionMsg('dm');
			}
			break;

		//dm everyone with predefined role in server
		case 'massdm':
			console.log(PREFIX + "massdm command called");
			//check if user has the adminRole
			if (checkAdmin()) {
				notEnabledMsg('massdm');
			} else {
				noPermissionMsg('massdm');
			}
			break;
		//get a random cat image from the aws.random.cat/meow api
		case 'cat':
			fetch('http://aws.random.cat/meow')
				.then(res => res.json())
				.then(json => animalEmbedSend(json, "cat"));
			 console.log(PREFIX + "cat command called");
			break;

		case 'dog':
			fetch('https://dog.ceo/api/breeds/image/random')
				.then(res => res.json())
				.then(json => animalEmbedSend(json, "dog"));
			console.log(PREFIX + "dogcommand called");
			break;

		//get random image from minecraft subreddit
		case 'mcRandom':
			console.log(PREFIX + "mcRandom command called");
			//notEnabledMsg('mcRandom');
			break;

		//send a message with all the commands listed in an embed
		case 'help':
			console.log(PREFIX + "help command called");
			notEnabledMsg('help');
			// const helpEmbed = new Discord.MessageEmbed()
			// .setColor('#ff3505')
			// .setTitle('Antares Server Help')
			// .addFields(
			// 	//enter text into embed
			// 	{ name: 'Command 1:' , value: 'The Antares Network Minecraft server has a few gamemodes for you to play on.', inline: true},
			// 	{ name: 'Game Modes:', value: 'Factions, Syblock, Prisons, Vanilla, and Creative Plots', inline: true},
			// 	{ name: 'Server IP:' , value: 'mc.playantares.com', inline: false},
			// 	{ name: 'Website:' , value: 'https://playantares.com', inline: false}
			// )
			break;
		case 'future1':
			console.log(PREFIX + "future1 command called");
			notEnabledMsg('future1');
			break;
		case 'future2':
			console.log(PREFIX + "future2 command called");
			notEnabledMsg('future2');
			break;
		case 'future3':
			console.log(PREFIX + "future3 command called");
			notEnabledMsg('future3');
			break;
		case 'future4':
			console.log(PREFIX + "future4 command called");
			notEnabledMsg('future4');
			break;
		case 'future5':
			console.log(PREFIX + "future5 command called");
			notEnabledMsg('future5');
			break;
		case 'scheduleMSG':
			console.log(PREFIX + "scheduleMSG command called");
			notEnabledMsg('scheduleMSG');
			break;
		default:
			noSuchCommand();
	}
})

//login to the discord api
//BOT_TOKEN is the Client Secret in the heroku dashboard
bot.login(process.env.BOT_TOKEN);
