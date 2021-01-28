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
const guildModel = require('./models/guild');
const piiModel = require('./models/pii');
const piiCreate = require('./events/piiCreate');
const gateModel = require('./models/gate');
const counting = require('./functions/counting');
require('dotenv').config();
require('colors');
global.botVersion = "1.2.17";

//actions to run at bot startup
bot.on('ready', async () => {
	onReady.event(bot)
	console.log("Startup script has run".red.bold)
});

//actions to run when the bot joins a server
bot.on("guildCreate", async (guild) => {
	docCreate.event(guild, bot);
	piiCreate.event(guild, bot);

})

//actions to run when the bot leaves a server
bot.on("guildDelete", async (guild) => {
	var d = new Date();
	try {
		await guildModel.findOneAndUpdate({ GUILD_ID: guild.id }, { $set: { GUILD_LEAVE_DATE: d.toString() } }, { new: true });
		bot.users.fetch('603629606154666024', false).then((user) => {
			user.send(`I left a server :(\n Name: ${guild.name}\n ID: ${guild.id}\n Owner: ${guild.owner}`);
		});
	} catch (e) {
		console.log(e);
	}
})


// actions to run when the bot recieves a message
bot.on('message', async (message) => {
	try {
		net = await gateModel.findOne({ GUILD_ID: message.guild.id });
		counting.count(message, bot);
	} catch (e) {
		console.log("Error on guild lookup. Maybe from a message sent in a DM to the bot")
	}
	//parse commands
	messageHandler.messageHANDLE(message, bot);
});

bot.on('messageDelete', async (message) => {
	console.log(`DELETE`.red, `[${message.guild.name}]`.green, `[${message.channel.name}]`.blue, `[${message.author.username}]`.yellow, `--`.grey, `${message.content}`.red)
});

bot.on('guildMemberAdd', async (member) => {
	var memberList = [];
	bot.guilds.cache.get(member.guild.id).members.cache.forEach(member => memberList.push(member.user.id));
	console.log(memberList)
	try {
		await piiModel.findOneAndUpdate({ GUILD_ID: member.guild.id }, { $set: { GUILD_MEMBERS: memberList } }, { new: true });
		console.log(`MEMBER JOIN`.teal, `[${member.guild.name}]`.green,  `[${member.username}]`.yellow)
	} catch (e) {
		console.log(e);
	}
})

bot.on('guildMemberRemove', async (member) => {
	var memberList = [];
	bot.guilds.cache.get(member.guild.id).members.cache.forEach(member => memberList.push(member.user.id));
	console.log(memberList)
	try {
		await piiModel.findOneAndUpdate({ GUILD_ID: member.guild.id }, { $set: { GUILD_MEMBERS: memberList } }, { new: true });
		console.log(`MEMBER LEAVE`.yellow, `[${member.guild.name}]`.green,  `[${member.username}]`.yellow)
	} catch (e) {
		console.log(e);
	}
})
bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));


//connect to MongoDB and then log bot into Discord
(async () => {
	var mongo_uri = String(process.env.BOT_MONGO_PATH);
	console.log('Trying to connect to MongoDB\nPlease wait for a connection'.yellow);
	await connect(mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
	console.log('Connected to MongoDB'.green.bold);

	//login to the discord api
	console.log('Trying to login to the Discord API\nPlease wait for a connection'.yellow);
	bot.login(process.env.BOT_TOKEN).catch(e => console.error(e));
	console.log("Logged into the Discord API".green.bold);
})()
