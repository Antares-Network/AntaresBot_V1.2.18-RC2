//send the invite link for the bot
module.exports = {
    inviteCMD: function (PREFIX, message) {
        console.log(PREFIX + "invite command called");
        message.channel.send("https://discord.com/oauth2/authorize?client_id=736086156759924762&scope=bot&permissions=8")
    }
}