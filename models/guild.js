//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//
//guild.js -- This houses the schema for talking to the MongoDB as well as the data that can be exchanged
const { Schema, model } = require('mongoose');

const GUILD = Schema({
    id: String,
    prefix: {
        default: '&',
        type: String
    },
    BOT_ADMIN_ROLE: String,
    BOT_SANTA_ROLE: String,
    BOT_DEFAULT_CHANNEL: String
})

module.exports = model('Guild', GUILD);