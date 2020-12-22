//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1

const Discord = require('discord.js');
const bot = new Discord.Client();
const onReady = require('./handlers/onReady');
const commandHandler = require('./handlers/commandHandler');
const guildModel = require('./models/guild');
const { connect } = require('mongoose');
require('dotenv').config();
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
	//parse commands
	commandHandler.commandHANDLE( message, bot, adminRole);
});


//connect to MongoDB and then log bot into Discord
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
	bot.login(process.env.BOT_TOKEN);
})()