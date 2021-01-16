
module.exports = {
    helpCMD: function (message) {
        message.channel.send("This is a list of all the commands: \n **ip**: Sends in a dm, the Minecraft server run by the bot Developer." + 
        "\n **cat**: Sends a random picture of a cat." +
        "\n **dog**: Sends a random picture of a dog." +
        "\n **reddit**: Sends a random meme from Reddit." +
        "\n **prefix**: Shows the Prefix for the bot." +
        "\n **invite**: Sends an invite for the bot and the support server." +
        "\n **ping**: Sends the ping time of the bot." +
        "\n **privacy**: Sends in a dm, the privacy policy for the bot.")
    }
}