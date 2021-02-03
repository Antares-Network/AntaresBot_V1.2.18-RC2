//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//onReady.js -- this will handle all the tasks that need to happen on bot startup, like connecting to any API's, servers, checking for updates
//connecting to databases, etc
const guildModel = require('../models/guild');
const piiModel = require('../models/pii');
const docCreate = require('../actions/docCreate');
const piiCreate = require('./piiCreate');

module.exports = {
	event: function (bot) {
		bot.guilds.cache.forEach(async guild => {
			const doc = await guildModel.findOne({ GUILD_ID: guild.id }); //find the entry for the guild
			const req = await piiModel.findOne({ GUILD_ID: guild.id }); //find the entry for the guild
			if (doc === null) {
				docCreate.event(guild, bot);
				console.log('Made new doccument'.yellow);
			}
			if (req == null) {
				piiCreate.event(guild, bot);
				console.log("Created PII doc".yellow);
			}
		});
		bot.user.setActivity(`&help | V: ${botVersion}`, { type: 'PLAYING' });
		console.log(`Set bot status to:`, `&help`.magenta, `| V:`, `${botVersion}`.magenta);
		console.log(`Logged in as`, `${bot.user.tag}`.magenta);
		console.log("The bot is online.".green);
	}
};
