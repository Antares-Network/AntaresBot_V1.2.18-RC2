//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js v12

//init vars and gc
const Discord = require('discord.js');
const bot = new  Discord.Client();
const PREFIX = '&';
console.log("Set bot prefix to be: " + PREFIX);



//actions to run at bot startup
bot.on('ready', () =>{
	console.log(`Logged in as ${bot.user.tag}!`);
	console.log('The bot is online.');
	bot.user.setActivity('for &ip', { type: 'LISTENING' });
	console.log("Set bot Status to LISTENING for &ip");
});

//actions to run when the bot recieves a message
bot.on('message', message => {


//check each message for the bot PREFIX
let args = message.content.substring(PREFIX.length).split(' ');
//check if user is playing santa game by detecting '+catch'
	if (message.content === "+catch"){

		//check if player has SantaPlayer role already
		if (message.member.roles.cache.has('788541905977081949')) {
			console.log("Tried to assign the role 'SantaPlayer' to " + message.author.username +  ", but they already have role 'SantaPlayer' already");
		} else {
			//if player doesn't already have the SantaPlayer role, give it to them
			message.member.roles.add('788541905977081949');
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
			console.log("The user, " +  message.author.username + " recieved &ip in a private message");
		break;

		case 'mk':

			//create new embed
			const ipEmbed = new Discord.MessageEmbed()
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
			message.author.send(ipEmbed);
			console.log("The user, " +  message.author.username + " recieved &mkp in a private message");
		break;

		//check if command is say
		case 'say':
			if(isNaN(args[1])){
				message.channel.send("INVALID CHANNEL ID!");
			} else {

				receivedMessage.channel.send(receivedMessage.content.replace('&say', ''));

				bot.channels.cache.get(args[1]).send(args[2]);
			}
	}
})


//login to the discord api
//BOT_TOKEN is the Client Secret in the heroku dashboard
bot.login(process.env.BOT_TOKEN);
