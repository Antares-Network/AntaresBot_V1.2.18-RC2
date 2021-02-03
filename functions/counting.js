const piiModel = require('../models/pii');

module.exports = {
    count: async function (message, bot) {
        srv = await piiModel.findOne({ GUILD_ID: message.guild.id }); //find the entry for the guild

        // Stores the current count.
        let count = Number(srv.GUILD_COUNTING_NUMBER);


        // Only do this for the counting channel of course
        if (bot.channels.cache.filter(c => c.name === 'counting').keyArray().includes(message.channel.id)) {
            let lm;
            // You can ignore all bot messages like this
            if (message.member.user.bot) return
            // If the message is the current count + 1...
            message.channel.messages.fetch({ limit: 2 }).then(async messages => {
                lm = messages.last();
                if (lm.author.id == message.author.id) {
                    message.delete();
                    message.channel.send(`Wait your turn! Please wait for someone else to send the next number.`)
                        .then(msg => {
                            msg.delete({ timeout: 5000 })
                        })
                } else if (Number(message.content) === count + 1) {
                    // ...increase the count
                    count++
                    await piiModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { GUILD_COUNTING_NUMBER: count } }, { new: true });
                    // If the message wasn't sent by the bot...
                } else if (message.member.id !== bot.user.id) {
                    // ...send a message because the person stuffed up the counting (and log all errors)
                    message.delete()
                    message.channel.send(`That is not the correct number. You should type *${count + 1}*`)
                    .then(msg => {
                        msg.delete({ timeout: 5000 })
                    })
                }
            })
        }
    }
}

