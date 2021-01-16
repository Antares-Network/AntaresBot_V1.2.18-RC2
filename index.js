//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1

const Discord = require('discord.js');
const bot = new Discord.Client();
const onReady = require('./events/onReady');
const messageHandler = require('./handlers/messageHandler');
const { connect } = require('mongoose');
const docCreate = require('./events/docCreate');
const guildDelete = require('./events/guildDelete');
const piiUpdate = require('./events/piiUpdate');
require('dotenv').config();

//actions to run at bot startup
bot.on('ready', async () => {
	onReady.event(bot)
	console.log("Startup script has run")
});

//actions to run when the bot joins a server
bot.on("guildCreate", async (guild) => {
	docCreate.event(guild, bot);
	piiUpdate.event(guild, bot);
	
})

//actions to run when the bot leaves a server
bot.on("guildDelete", async (guild) => {
	//Nothing here yet
})

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));

//actions to run when the bot recieves a message
bot.on('message', async (message) => {
	//parse commands
	messageHandler.messageHANDLE(message, bot);
});


//connect to MongoDB and then log bot into Discord
(async () => {
	var mongo_uri = String(process.env.BOT_MONGO_PATH);
	console.log('Trying to connect to MongoDB\nPlease wait for a connection');
	await connect(mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
	console.log('Connected to MongoDB');
	//login to the discord api
	bot.login(process.env.BOT_TOKEN);
	console.log("Logged into the Discord API");
})()