//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//roleHandler.js -- this will handle checking if user has a role, assigning roles, removing roles, updating role permissions etc

module.exports = {
    checkAdmin: function (message) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            //return boolean if user has the specified role (admin)
            console.log("Checked if " + message.author.username + " is an admin and they are");
            return true;
        } else {
            return false;
        }
    },
    noPermissionMsg: function (message, command) {
        //send the following message to the channel the command originated
        message.channel.send("You do not have the required permissions to run this command.");
        console.log("User: " + message.author.username + " tried to use command: " + command + ", but did not have the correct permission");
    },
    checkBotOwner: function (message) {
        if (message.author.id === '603629606154666024') {
            //return boolean true if the user is @nathen418#0002 with user id '603629606154666024'
            console.log("Checked if " + message.author.username + " is @nathen418#0002 and they are");
            return true;
        } else {
            return false;
        }
    }
};