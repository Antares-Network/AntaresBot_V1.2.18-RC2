//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1

//init vars and gc
const Discord = require('discord.js');
const bot = new  Discord.Client();
require('dotenv').config();
const PREFIX = process.env.BOT_PREFIX;
const adminRole = process.env.BOT_ADMIN_ROLE;
const santaRole = process.env.BOT_SANTA_ROLE;

function startup(){
	console.log("Set bot prefix to be: " + PREFIX);
	console.log(`Logged in as ${bot.user.tag}!`);
	console.log('The bot is online.');
	console.log("Set Admin role to be: " + adminRole);
	console.log("Set Santa role to be: " + santaRole);
	bot.user.setActivity('for ' + PREFIX + 'ip', { type: 'LISTENING' });
	console.log("Set bot status to LISTENING for ' + PREFIX + 'ip");
}


//actions to run at bot startup
bot.on('ready', () =>{
	startup();
	console.log("Startup script ran")
});

//actions to run when the bot recieves a message
bot.on('message', message => {

function checkAdmin(){
	//return boolean if user has the specified role (admin)
	console.log("Checked if" + message.author.username + " has admin role with ID: " + adminRole);
	return message.member.roles.cache.has(adminRole);
}

function notEnabledMsg(command){
	//send the following message to the channel the command originated
	message.channel.send("This command is not enabled yet.");
	console.log("User: " + message.author.username + " tried to use command: " + command + ", but it was not enabled");
}

function noPermissionMsg(command){
	//send the following message to the channel the command originated
	message.channel.send("You do not have the required permissions to run this command.");
	console.log("User: " + message.author.username + " tried to use command: " + command + ", but did not have the correct permission");
}

function noSuchCommand(command){
	message.channel.send("No such command exists. Check your syntax.");
	//must fix this. currently no command gets sent to this function
	console.log("User: " + message.author.username + " tried to use command: " + command + ", but that command does not exist.");

}

//check each message for the bot PREFIX
let args = message.content.substring(PREFIX.length).split(' ');

//check if user is playing santa game by detecting '+catch'
	if (message.content === "+catch"){

		//check if player has SantaPlayer role already
		if (message.member.roles.cache.has(santaRole)) {
			console.log("Tried to assign the role 'SantaPlayer' to " + message.author.username +  ", but they already have role 'SantaPlayer' already");
		} else {
			//if player doesn't already have the SantaPlayer role, give it to them
			message.member.roles.add(santaRole);
			console.log("User " + message.author.username +  " was assigned role 'SantaPlayer' by running '+catch' ")
		}
	}

	if (!message.content.startsWith(PREFIX)) return;

	switch(args[0]){
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
				{ name: 'Server Description:' , value: 'The Antares Network Minecraft server has a few gamemodes for you to play on.', inline: true},
				{ name: 'Game Modes:', value: 'Factions, Syblock, Prisons, Vanilla, and Creative Plots', inline: true},
				{ name: 'Server IP:' , value: 'mc.playantares.com', inline: false},
				{ name: 'Website:' , value: 'https://playantares.com', inline: false}
			)
			.setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms. | Antares Network`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');

			//send message in private message
			message.author.send(ipEmbed);
			console.log("The user, " +  message.author.username + " recieved " + PREFIX + "ip in a private message");
		break;
		case 'mk':

			//create new embed
			const mkEmbed = new Discord.MessageEmbed()
			.setColor('#ff3505')
			.setTitle('HIIII MKKKKK')
			.addFields(
				//enter text into embed
				{ name: 'Description:' , value: 'Smol pretzel🥨', inline: true},
				{ name: 'Reason for existing:', value: 'Provides cuddles and is cute', inline: true},
				{ name: 'Status:' , value: 'Cute but grumpy', inline: false},
				{ name: 'Website:' , value: 'N/A', inline: false}
			)
			.setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms. | From The Antares Network`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');

			//send message in private message
			message.author.send(mkEmbed);
			console.log("The user, " +  message.author.username + " recieved " + PREFIX + "mkp in a private message");
		break;
		//check if command is say
		case 'say':
			console.log(PREFIX + "say command called");
			if(checkAdmin()){
				//check if the first argument is a number
				if(isNaN(args[1])){
					args.shift();
					var msg = args.join(" ");
					message.channel.send(msg);
					console.log("The user, " +  message.author.username + " ran " + PREFIX + "say with the message: " + msg);
				} else {
	
					//convert the message into something that can be easily sent by the bot
					var chanID = args[1];
					args.shift();
					args.shift();
					var msg = args.join(" ");
					bot.channels.cache.get(chanID).send(msg);
					console.log("The user, " +  message.author.username + " ran " + PREFIX + "say with the message: " + msg);
				}
			}
		break;
		case 'interact':
			console.log(PREFIX + "interact command called");
			//check if user has the adminRole
			if(checkAdmin()){
				notEnabledMsg('interact');			
			} else {
				noPermissionMsg('interact');
			}
		break;
		case 'dm':
			console.log(PREFIX + "dm command called");
			//check if user has the adminRole
			if(checkAdmin()){
				notEnabledMsg('dm');				
			} else {
				noPermissionMsg('dm');
			}
		break;
		case 'massdm':
			console.log(PREFIX + "massdm command called");
			//check if user has the adminRole
			if(checkAdmin()){
				notEnabledMsg('massdm');				
			} else {
				noPermissionMsg('massdm');
			}
		break;
		case 'imageRandom':
			console.log(PREFIX + "imageRandom command called");
			notEnabledMsg('imageRandom');				
		break;
		case 'memeRandom':
			console.log(PREFIX + "memeRandom command called");
			notEnabledMsg('memeRandom');				
		break;
		case 'mcRandom':
			console.log(PREFIX + "mcRandom command called");
			notEnabledMsg('mcRandom');
		break;
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
