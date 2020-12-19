//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//roleHandler.js -- this will handle checking if user has a role, assigning roles, removing roles, updating role permissions etc

module.exports = {
    checkAdmin: function(message, adminRole) {
        //return boolean if user has the specified role (admin)
        console.log("Checked if " + message.author.username + " has admin role with ID: " + adminRole);
        return message.member.roles.cache.has(adminRole);
    },
    noPermissionMsg: function(message, command) {
        //send the following message to the channel the command originated
        message.channel.send("You do not have the required permissions to run this command.");
        console.log("User: " + message.author.username + " tried to use command: " + command + ", but did not have the correct permission");
    }
};