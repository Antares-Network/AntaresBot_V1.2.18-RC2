//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//onReady.js -- this will handle all the tasks that need to happen on bot startup, like connecting to any API's, servers, checking for updates
//connecting to databases, etc

module.exports = {
	event: function (bot) {
		bot.user.setActivity('&help | Version: 1.2.4', { type: 'PLAYING' });
		console.log("Set bot status to: &help | Version: 1.2.4");
		console.log(`Logged in as ${bot.user.tag}`);
		console.log("The bot is online.");
	}
};
