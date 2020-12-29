
module.exports = {
    command: function(guild, command){
        console.log("Someone in  the server \"" + guild.name + "\" ran the command: " + command);
    },
    message: function(guild, message){
        console.log(message.author.username + " in  the server \"" + guild.name + "\" sent the message: " + message.content);

    }
}