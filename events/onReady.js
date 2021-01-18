//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//onReady.js -- this will handle all the tasks that need to happen on bot startup, like connecting to any API's, servers, checking for updates
//connecting to databases, etc
const guildModel = require('../models/guild');
const docCreate = require('../events/docCreate');
const piiUpdate = require('../events/piiUpdate');


module.exports = {
	event: function (bot) {
		bot.guilds.cache.forEach(async guild => {
			const srv = await guildModel.findOne({ GUILD_ID: guild.id }); //find the entry for the guild
			if (srv === null) {
				docCreate.event(guild, bot);
				piiUpdate.event(guild, bot);
				console.log('Made new doccument');
				console.log("Created PII doc");
			}
		});
		bot.user.setActivity('&help | Version: 1.2.5', { type: 'PLAYING' });
		console.log("Set bot status to: &help | Version: 1.2.5");
		console.log(`Logged in as ${bot.user.tag}`);
		console.log("The bot is online.");
	}
};
