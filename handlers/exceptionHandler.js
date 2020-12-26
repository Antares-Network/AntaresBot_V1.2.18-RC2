//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//exceptionHandler.js -- This will handle exceptions thrown in the main js

module.exports = {
	notEnabledMsg: function(message, command) {
		//send the following message to the channel the command originated
		message.channel.send("This command is not enabled yet.");
		console.log(`User: ${message.author.username} tried to use command: ${command}, but it was not enabled`);
	},

	noSuchCommand: function(message) {
		message.channel.send("No such command exists. Check your syntax.");
		//must fix this. currently no command gets sent to this function
		console.log(`User: ${message.author.username} tried to use command: ${message.content}, but that command does not exist.`);

    }
}