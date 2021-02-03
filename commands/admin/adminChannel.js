const { Command } = require('discord.js-commando');
const guildModel = require('../../models/guild');

module.exports = class AdminChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'adminchannel',
            group: 'admin',
            memberName: 'adminchannel',
            description: 'Sets the admin channel for the guild.',
            examples: ['adminchannel "CHANNELID"'],
            args: [
                {
                    key: 'text',
                    prompt: 'Please input a channel ID',
                    type: 'string'
                }
            ],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async run(message, { text }) {
        //check to see if an admin channel is set for this server yet
        const req = await guildModel.findOne({ GUILD_ID: message.guild.id });
        //if the server has an admin channel, send it here
        message.channel.send(`This server's admin channel is: <#${req.GUILD_ADMIN_CHANNEL}>`);
        if (!isNaN(text)) {
            const doc = await guildModel.findOneAndUpdate({ GUILD_ID: message.guild.id }, { $set: { GUILD_ADMIN_CHANNEL: text } }, { new: true });
            message.channel.send(`Set the admin channel to <#${doc.GUILD_ADMIN_CHANNEL}>`);
            await doc.save();
        }
        //logToConsole.command(message.guild, message);
    }
};

