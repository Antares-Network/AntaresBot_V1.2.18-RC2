const piiModel = require('../models/guild');


module.exports = {
    command: async function (guild, message) {
        console.log("Someone in  the server \"" + guild.name + "\" ran the command: " + message.content);
        //get the command count of the current guild (THIS WILL BE DELETED LATER AS IT MAKES TOO MANY REQUESTS TO THE DB)
        //this code also uses too much memory
        const req = await piiModel.findOne({ GUILD_ID: message.guild.id });
        var cmdCount = (req.GUILD_COMMAND_COUNT + 1);
        //update the command count in the db
        const doc = await piiModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { GUILD_COMMAND_COUNT: cmdCount } }, { new: true });
        await doc.save();
        
    },
    message: function (guild, message) {
        console.log(message.author.username + " in  the server \"" + guild.name + "\" sent the message: " + message.content);
    }
}