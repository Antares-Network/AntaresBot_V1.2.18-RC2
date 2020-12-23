//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1

const Discord = require('discord.js');
const bot = new Discord.Client();
const onReady = require('./events/onReady');
const commandHandler = require('./handlers/commandHandler');
const { connect } = require('mongoose');
const guildCreate = require('./events/guildCreate');
const guildDelete = require('./events/guildDelete');
require('dotenv').config();

//actions to run at bot startup
bot.on('ready', async () => {
	onReady.event(bot)
	console.log("Startup script has run")
});

//actions to run when the bot joins a server
bot.on("guildCreate", async (guild) => {
	guildCreate.event(guild);
})

//actions to run when the bot leaves a server
bot.on("guildDelete", async (guild) => {
	guildDelete.event(guild);
})

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));

//actions to run when the bot recieves a message
bot.on('message', async (message) => {
	//parse commands
	commandHandler.commandHANDLE(message, bot, adminRole);
});


//connect to MongoDB and then log bot into Discord
(async () => {
	var mongo_uri = String(process.env.BOT_MONGO_PATH);
	console.log('Trying to connect to MongoDB\n Please wait for a connection.')
	await connect(mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
	console.log('Connected to MongoDB. Updating fetching DB.')
	//login to the discord api
	bot.login(process.env.BOT_TOKEN);
})()