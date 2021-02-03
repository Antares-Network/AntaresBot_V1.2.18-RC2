const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const api = require('random-stuff-api');
const channelCheck = require('../../functions/channelCheck')


module.exports = class RandomCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            group: 'user',
            memberName: 'random',
            description: 'Sends a random *thing*. Send *random* for more details',
            examples: ['random joke'],
            args: [
                {
                    key: 'text',
                    prompt: 'lalallala',
                    type: 'string',
                    default: ''
                }
            ],
            guildOnly: true
        });
    }

    async run(message, { text }) {
        if (await channelCheck.check(message) == true) {
            switch (text.toUpperCase()) {
                case 'JOKE':
                    api.random.joke()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'CN':
                    api.random.cnjoke()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'DEVJOKE':
                    api.random.devjoke()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'INSULT':
                    api.random.insult()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'AWW':
                    api.image.aww()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'FACEPALM':
                    api.image.facepalm()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'WHOLESOME':
                    api.image.wholesome()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'DANKMEME':
                    api.image.dankmeme()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'HPMEME':
                    api.image.hpmeme()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'ART':
                    api.image.art()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
                case 'DEADINSIDE':
                    api.image.deadinside()
                        .then(result => {
                            message.channel.send(result)
                        })
                    return;
            }
            if (!text) {
                console.log(text)
                const Embed = new MessageEmbed()
                    .setColor('#ff3505')
                    .setURL('https://discord.gg/6pZ2wtGANP')
                    .setTitle("A list of commands that return random things")
                    .setDescription("**random joke**: returns a dad joke" +
                        "\n\n **random cn**: returns a Chuck Norris Joke" +
                        "\n\n **random devjoke**: returns a dev joke" +
                        "\n\n **random insult**: returns a random insult" +
                        "\n\n **random aww**: returns a cute moment" +
                        "\n\n **random facepalm**: returns a facepalm moment" +
                        "\n\n **random wholesome**: returns a wholesome meme" +
                        "\n\n **random dankmeme**: returns a dank meme :o" +
                        "\n\n **random deadinside**: returns a 'Watch people die inside' moment" +
                        "\n\n **random art**: returns cool art pic" +
                        "\n\n **random hpmeme**: returns a harry potter meme")
                    .setFooter(`Delivered in: ${Date.now() - message.createdTimestamp}ms | Antares Bot | ${botVersion}`, 'https://cdn.discordapp.com/icons/649703068799336454/1a7ef8f706cd60d62547d2c7dc08d6f0.png');
                message.channel.send(Embed);

                //send to the console that this command was run
                //logToConsole.command(message.guild, message);
            }
        }
    }
};