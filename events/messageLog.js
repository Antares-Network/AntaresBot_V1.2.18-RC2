const guildModel = require('../models/guild');

module.exports = {
    log: async function (message) {
        const req = await guildModel.findOne({ GUILD_ID: message.guild.id });

        const doc = await guildModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { GUILD_MESSAGES: parseInt(req.GUILD_MESSAGES) + 1 } }, { new: true });
        await doc.save();
    }
}