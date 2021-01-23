//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//Project started on December 15, 2020

const Discord = require('discord.js');
const bot = new Discord.Client();
const onReady = require('./events/onReady');
const messageHandler = require('./handlers/messageHandler');
const { connect } = require('mongoose');
const docCreate = require('./events/docCreate');
const piiUpdate = require('./events/piiUpdate');
const piiModel = require('./models/pii');

require('dotenv').config();
require('colors');
global.botVersion = "1.2.14";
// Stores the timeout used to make the bot count if nobody else counts for a set period of
// time.
let timeout

//actions to run at bot startup
bot.on('ready', async () => {
	onReady.event(bot)
	console.log("Startup script has run".red)
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
	const srv = await piiModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild
	// Stores the current count.
	let count = Number(srv.GUILD_COUNTING_NUMBER);


	// Only do this for the counting channel of course
	if (bot.channels.cache.filter(c => c.name === 'counting').keyArray().includes(message.channel.id)) {
		// You can ignore all bot messages like this
		if (message.member.user.bot) return
		// If the message is the current count + 1...
		if (Number(message.content) === count + 1) {
			// ...increase the count
			count++
			await piiModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { GUILD_COUNTING_NUMBER: count } }, { new: true });
			// Remove any existing timeout to count
			if (timeout) bot.clearTimeout(timeout)
			// Add a new timeout
			timeout = bot.setTimeout(
				// This will make the bot count and log all errors
				() => message.channel.send(++count).catch(console.error),
				// after 30 seconds
				30000
			)
			// If the message wasn't sent by the bot...
		} else if (message.member.id !== bot.user.id) {
			// ...send a message because the person stuffed up the counting (and log all errors)
			message.delete()
			// Reset any existing timeout because the bot has counted so it doesn't need to count again
			if (timeout) bot.clearTimeout(timeout)
		}
	}

	//parse commands
	messageHandler.messageHANDLE(message, bot);
});


//connect to MongoDB and then log bot into Discord
(async () => {
	var mongo_uri = String(process.env.BOT_MONGO_PATH);
	console.log('Trying to connect to MongoDB\nPlease wait for a connection'.yellow);
	await connect(mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
	console.log('Connected to MongoDB'.green);

	//login to the discord api
	console.log('Trying to login to the Discord API\nPlease wait for a connection'.yellow);
	bot.login(process.env.BOT_TOKEN);
	console.log("Logged into the Discord API".green);
})()
