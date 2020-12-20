//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//onReady.js -- this will handle all the tasks that need to happen on bot startup, like connecting to any API's, servers, checking for updates
//connecting to databases, etc

module.exports = {
    startup: function(adminRole, santaRole, bot) {
		bot.user.setActivity('In Development', { type: 'PLAYING' });
        //bot.user.setActivity('for ' + PREFIX + 'ip', { type: 'LISTENING' });
		//console.log("Set bot status to LISTENING for " + PREFIX + "ip");
		console.log("Set bot status to LISTENING for PREFIXip");
		// console.log("Set bot prefix to be: " + PREFIX);
		console.log("Set bot prefix to be: PREFIX");
	    console.log(`Logged in as ${bot.user.tag}`);
	    console.log("The bot is online.");
	    console.log("Set Admin role to be: " + adminRole);
	    console.log("Set Santa role to be: " + santaRole);
    }
};


// function startup() {
// 	bot.user.setActivity('for ' + PREFIX + 'ip', { type: 'LISTENING' });
// 	console.log("Set bot status to LISTENING for " + PREFIX + "ip");
// 	console.log("Set bot prefix to be: " + PREFIX);
// 	console.log(`Logged in as ${bot.user.tag}`);
// 	console.log("The bot is online.");
// 	console.log("Set Admin role to be: " + adminRole);
// 	console.log("Set Santa role to be: " + santaRole);

// }
