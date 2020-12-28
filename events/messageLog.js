
module.exports = {
    log: function (message) {
        const srv = await piiModel.findOne({ GUILD_ID: message.guild.id });
        const doc = await piiModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { prefix: args[1] } }, { new: true });
        message.channel.send(`Set the prefix to ${doc.prefix}`);
        await doc.save();
    }
}