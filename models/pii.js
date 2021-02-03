//Nate Goldsborough
//Antares Network Discord Bot 
//This project will morph overtime
//built for discord.js V.12.5.1
//


const { Schema, model } = require('mongoose');

const PII = Schema({
    id: String,
    GUILD_ID: String,
    GUILD_NAME: String,
    GUILD_MEMBERS: Array,
    GUILD_CHANNELS: Array,
    GUILD_ROLES: Array,
    GUILD_DEFAULT_CHANNEL: String,
    GUILD_COUNTING_NUMBER: String
})

module.exports = model('PII', PII);